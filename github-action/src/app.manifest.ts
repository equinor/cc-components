import { defineAppManifest } from '@equinor/fusion-framework-cli/app';

// Shared by every app and report. The version is not kept in package.json:
// the release scripts ask Fusion for the highest uploaded version and bump it.
export default defineAppManifest(() => {
  const version = process.env.APP_VERSION;
  if (!version) {
    throw new Error('APP_VERSION must be set when building an app for release');
  }
  const commitSha = process.env.APP_COMMIT_SHA;
  return { build: { version, ...(commitSha && { commitSha }) } };
});
