/* eslint-disable no-console */
import { ExecutorContext, logger } from '@nrwl/devkit';
import { versionHelper } from './lib/versionHelper';
import { VersionExecutorSchema } from './schema';
import changelogExecutor from '../changelog/executor';

export default async function runExecutor(
  options: VersionExecutorSchema,
  context: ExecutorContext
) {
  if (!options.reason) {
    logger.error('Please provide a reason for bumping');
    return {
      success: false,
    };
  }
  const { bumpVersion, checkVersions, pkgJsonToManifestVersion, rollback } =
    versionHelper(context.root, context.projectName);
  if (options.type === 'patch') {
    logger.info('Incrementing patch version');
    bumpVersion('patch');
  } else if (options.type === 'minor') {
    logger.info('Incrementing minor version');
    bumpVersion('minor');
  } else if (options.type === 'major') {
    logger.info('Incrementing major version');
    bumpVersion('major');
  } else {
    logger.error('Use a valid version type: major, minor or patch');
    logger.error(`You used: ${options.type} as a version type which is invalid!`);
    return {
      success: false,
    };
  }

  if (!checkVersions()) {
    logger.warn('Package.json and app-manifest.json versions are not identical');
    logger.warn('Updating package.json version to the new app-manifest.json version!!');
    pkgJsonToManifestVersion();
  }

  const res = await changelogExecutor(
    {
      reason: options.reason,
    },
    context
  );
  if (!res.success) {
    logger.info('Something failed, rolling back to latest version');
    rollback();

    return {
      success: false,
    };
  }
  return {
    success: true,
  };
}
