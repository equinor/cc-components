/* eslint-disable no-console */
import { ExecutorContext, readJsonFile, writeJsonFile } from '@nrwl/devkit';
import { VersionExecutorSchema } from './schema';

export default async function runExecutor(
  options: VersionExecutorSchema,
  context: ExecutorContext
) {
  const path = `${context.root}/apps/${context.projectName}`;
  const appManifestPath = `${path}/app-manifest.json`;
  const packageJsonPath = `${path}/package.json`;
  const file = readJsonFile(appManifestPath);
  const version = file.version;

  if (options.type === 'patch') {
    console.log('Incrementing patch version');

    const patchVersionNumber = Number(file.version.patch);
    const updated = {
      ...file,
      version: {
        ...version,
        patch: `${patchVersionNumber + 1}`,
      },
    };
    writeJsonFile(appManifestPath, updated);
  } else if (options.type === 'minor') {
    console.log('Incrementing minor version');

    const minorVersionNumber = Number(file.version.minor);
    const updated = {
      ...file,
      version: {
        ...version,
        minor: `${minorVersionNumber + 1}`,
      },
    };

    writeJsonFile(appManifestPath, updated);
  } else if (options.type === 'major') {
    console.log('Incrementing major version');

    const majorVersionNumber = Number(file.version.major);
    const updated = {
      ...file,
      version: {
        ...version,
        major: `${majorVersionNumber + 1}`,
      },
    };
    writeJsonFile(appManifestPath, updated);
  } else {
    console.log('Use a valid version type: major, minor or patch');
    return {
      success: false,
    };
  }
  const maybeNewfile = readJsonFile(appManifestPath);
  console.log('Your app-manifest.json is now:', maybeNewfile);

  const packageJson = readJsonFile(packageJsonPath);
  console.log('Your package.json version is', packageJson.version.split('.'));
  console.log(Object.values(maybeNewfile.version));
  return {
    success: true,
  };
}
