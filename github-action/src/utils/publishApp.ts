import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { notice } from '@actions/core';

const manifestPath = fileURLToPath(new URL('../app.manifest.ts', import.meta.url));

export type FusionEnv = 'ci' | 'fprd';

/**
 * Builds, packs, uploads and tags the app in the current directory as `latest`,
 * using the Fusion Framework CLI.
 */
export function publishApp(env: FusionEnv, token: string, version: string, sha = '') {
  notice(`publishing version ${version} to ${env}`);
  execSync(
    `pnpm exec fusion-framework-cli app publish --env ${env} --manifest "${manifestPath}"`,
    {
      stdio: 'inherit',
      // The token goes through the environment so it never shows up in a process list.
      env: {
        ...process.env,
        FUSION_TOKEN: token,
        APP_VERSION: version,
        APP_COMMIT_SHA: sha,
      },
    }
  );
}
