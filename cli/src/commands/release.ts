import { commitRelease } from './commit-release.js';
import ora from 'ora';
import { patchVersion } from '../utils/patchVersion.js';
import { getFilesize } from '../utils/getFileSizeInBytes.js';
import { pushChanges } from './push-changes.js';

import { zipBundle } from './zip-bundle.js';
import { makeManifest } from './make-app-manifest.js';
import { pullChanges } from './pull-changes.js';

export function release() {
  pullChanges();
  //Bump version
  patchVersion();
  // Create manifest
  makeManifest('./package.json');
  //Vite build
  const spinner = ora('Bundling application').start();
  // execSync('vite build');
  spinner.stop();

  //zip bundle
  zipBundle();

  const bundleSpinner = ora('Calculating bundle size');
  const sizeInMb = getFilesize('./dist/app-bundle.js', 'mb');
  if (sizeInMb > 10) {
  }

  switch (true) {
    case sizeInMb >= 20:
      bundleSpinner.fail(`Bundle size ${sizeInMb}MB!`);
      break;

    case sizeInMb >= 10:
      bundleSpinner.warn(`Bundle size ${sizeInMb}MB`);
      break;

    default:
      bundleSpinner.succeed(`Bundle size ${sizeInMb}MB`);
  }

  //create commit
  commitRelease();
  //upload
  console.log('Uploading to fdev something');
  //push commit
  // pushChanges();
}
