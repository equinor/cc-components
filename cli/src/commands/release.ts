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

export async function release(
  dry: boolean,
  env: FusionEnvironment,
  versionInc: VersionIncrement
) {
  //Ensure latest changes have been pulled
  pullChanges();

  //Bump version
  patchVersion(versionInc);

  compileApp();

  //Vite build
  bundleApp();

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

    //push commit
    pushChanges();
  } else {
    ora().info('Skipping release').stop();
  }
}
