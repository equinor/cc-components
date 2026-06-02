import type { Alias } from 'vite';

/** Absolute path to the repository root (directory of this module). */
export declare const repoRoot: string;

/**
 * Vite `resolve.alias` entries mapping every internal `@cc-components/*`
 * package (and the `@cc-components/shared` subpath exports) to its TypeScript
 * source, enabling true HMR in the Fusion CLI dev server.
 */
export declare const ccAliases: () => Alias[];

declare const _default: typeof ccAliases;
export default _default;
