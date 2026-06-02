// Generates Vite `resolve.alias` entries that point every internal
// `@cc-components/*` package at its TypeScript source instead of its built
// `dist/` output. This is what gives the Fusion CLI dev server
// (`fusion-framework-cli app dev`) true hot module replacement for library
// edits: because `@vitejs/plugin-react` is already part of the dev server's
// base config, serving source enables React Fast Refresh across package
// boundaries.
//
// Consumed by each app's `dev-server.config.ts`.

import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Resolve the monorepo root by walking up until the `pnpm-workspace.yaml`
 * marker is found. This is intentionally NOT `dirname(import.meta.url)`: the
 * Fusion CLI loads `dev-server.config.ts` by bundling it (and this relative
 * import) with esbuild into an app-local `node_modules/.cache` file, which
 * would make `import.meta.url` point at the cache dir. Walking up to the
 * workspace marker works from either location because both live inside the repo.
 */
const findRepoRoot = () => {
  let dir = dirname(fileURLToPath(import.meta.url));
  // eslint-disable-next-line no-constant-condition
  while (true) {
    if (existsSync(resolve(dir, 'pnpm-workspace.yaml'))) return dir;
    const parent = dirname(dir);
    if (parent === dir) {
      throw new Error('[dev-server.aliases] Could not locate repo root (pnpm-workspace.yaml)');
    }
    dir = parent;
  }
};

export const repoRoot = findRepoRoot();

const LIBS_DIR = resolve(repoRoot, 'libs');

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/**
 * Turn a built target (e.g. `./dist/src/index.js`) into its source counterpart
 * (`<libDir>/src/index.ts` or `.tsx`). Returns the first existing candidate.
 */
const resolveSource = (libDir, distTarget, specifier, { required = true } = {}) => {
  const srcRelative = distTarget
    .replace(/^\.\//, '')
    .replace(/(^|\/)dist\/src\//, '$1src/')
    .replace(/(^|\/)dist\//, '$1src/')
    .replace(/\.js$/, '');

  const base = resolve(libDir, srcRelative);
  const candidates = [`${base}.ts`, `${base}.tsx`, resolve(base, 'index.ts'), resolve(base, 'index.tsx')];
  const match = candidates.find((candidate) => existsSync(candidate));

  if (!match) {
    const message =
      `[dev-server.aliases] Could not resolve source for "${specifier}". ` +
      `Tried: ${candidates.join(', ')}`;
    // A single-entry package MUST resolve, otherwise the app breaks. A stale
    // subpath in an `exports` map (no matching source) is harmless — it simply
    // keeps falling back to dist, so warn and skip rather than fail the whole
    // dev server.
    if (required) throw new Error(message);
    console.warn(`${message} — skipping (stale exports entry?)`);
    return undefined;
  }
  return match;
};

/**
 * Build the alias entries for a single library package.
 * @returns {{ find: RegExp, replacement: string }[]}
 */
const aliasesForPackage = (libDir, pkg) => {
  const { name, exports: pkgExports, main } = pkg;
  if (!name) return [];

  const entries = [];

  if (pkgExports && typeof pkgExports === 'object') {
    // Subpath exports map (e.g. @cc-components/shared). Mirror every entry
    // exactly so subpaths resolve to source rather than falling back to dist.
    for (const [subpath, target] of Object.entries(pkgExports)) {
      if (typeof target !== 'string') {
        throw new Error(
          `[dev-server.aliases] Unsupported conditional exports for "${name}${subpath.replace(/^\./, '')}". ` +
            `Only string targets are handled.`
        );
      }
      const specifier = subpath === '.' ? name : `${name}/${subpath.replace(/^\.\//, '')}`;
      const replacement = resolveSource(libDir, target, specifier, { required: subpath === '.' });
      if (!replacement) continue;
      entries.push({
        find: new RegExp(`^${escapeRegExp(specifier)}$`),
        replacement,
      });
    }
    return entries;
  }

  // Single-entry package: alias the bare specifier to its source index.
  const target = main ?? './dist/src/index.js';
  entries.push({
    find: new RegExp(`^${escapeRegExp(name)}$`),
    replacement: resolveSource(libDir, target, name),
  });
  return entries;
};

/**
 * Scan `libs/*` and produce Vite `resolve.alias` entries for every
 * `@cc-components/*` package, pointing each at its TypeScript source.
 * Throws if a derived source path does not exist (fail-fast: prevents a stale
 * `dist` build from silently shadowing source).
 *
 * @returns {{ find: RegExp, replacement: string }[]}
 */
export const ccAliases = () => {
  const aliases = [];

  for (const dirent of readdirSync(LIBS_DIR, { withFileTypes: true })) {
    if (!dirent.isDirectory()) continue;
    const libDir = resolve(LIBS_DIR, dirent.name);
    const pkgPath = resolve(libDir, 'package.json');
    if (!existsSync(pkgPath)) continue;

    const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
    if (!pkg.name?.startsWith('@cc-components/')) continue;

    aliases.push(...aliasesForPackage(libDir, pkg));
  }

  return aliases;
};

export default ccAliases;
