import { commitRelease } from './commit-release.js';
import { patchVersion } from '../utils/patchVersion.js';
import { pushChanges } from './push-changes.js';
import { zipBundle } from './zip-bundle.js';
import { makeManifest } from './make-app-manifest.js';
import { pullChanges } from './pull-changes.js';
import { deployApp } from '../utils/deployApp.js';
import { logBundleSize } from '../utils/logBundleSize.js';
import { bundleApp } from '../utils/bundleApp.js';

export function release() {
  //Ensure latest changes have been pulled
  pullChanges();

  //Bump version
  patchVersion();

  //Vite build
  bundleApp();

  // Create manifest
  makeManifest('./package.json');

  //Log bundle size
  logBundleSize();

  //zip bundle
  zipBundle();

  //create commit
  commitRelease();

  //upload to fdev
  deployApp();

  //push commit
  pushChanges();
}
