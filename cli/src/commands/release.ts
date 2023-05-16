import { commitRelease } from './commit-release.js';
import { patchVersion } from '../utils/patchVersion.js';
import { pushChanges } from './push-changes.js';
import { zipBundle } from './zip-bundle.js';
import { makeManifest } from './make-app-manifest.js';
import { pullChanges } from './pull-changes.js';
import { FusionEnvironment, deployApp } from '../utils/deployApp.js';
import { logBundleSize } from '../utils/logBundleSize.js';
import { bundleApp } from '../utils/bundleApp.js';
import { compileApp } from '../utils/compile.js';
import ora from 'ora';
import { VersionIncrement } from '../main.js';
import { downloadCIBundle } from './download_zip_bundle.js';
import { parsePackageJson } from '../utils/parsePackageJson.js';
import { writeTraceFileAsync } from '../utils/writeTrace.js';

export async function release(
  dry: boolean,
  env: FusionEnvironment,
  versionInc: VersionIncrement | null
) {
  //Ensure latest changes have been pulled
  pullChanges();

  if (versionInc) {
    //Bump version
    patchVersion(versionInc);
  }

  compileApp();

  //Vite build
  await prepareBundle(env);

  // Create manifest
  makeManifest('./package.json');

  //Log bundle size
  logBundleSize();

  //zip bundle
  zipBundle();

  if (!dry) {
    //create commit
    commitRelease();

    //upload to fdev
    await deployApp(env);

    await writeTraceFileAsync(env);

    //push commit
    pushChanges();
  } else {
    ora().info('Skipping release').stop();
  }
}

async function prepareBundle(env: FusionEnvironment) {
  const { name } = parsePackageJson();
  if (!name) {
    throw new Error('Missing name in package.json');
  }
  switch (env) {
    case 'ci':
    case 'fqa':
      return bundleApp();

    case 'fprd':
      console.log('Download ci bundle');
      return downloadCIBundle(name);
  }
}
