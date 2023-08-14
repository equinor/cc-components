import { zipBundle } from './zip-bundle.js';
import { makeManifest } from './make-app-manifest.js';
import { FusionEnvironment, deployApp } from '../utils/deployApp.js';
import { logBundleSize } from '../utils/logBundleSize.js';
import { bundleApp } from '../utils/bundleApp.js';
import { compileApp } from '../utils/compile.js';
import ora from 'ora';
import { downloadCIBundle } from './download_zip_bundle.js';
import { parsePackageJson } from '../utils/parsePackageJson.js';
import { chdir, cwd } from 'process';
import { execSync } from 'child_process';

export async function releasePr() {
  compileApp();

  await ensureProjectBuilds();

  //Vite build
  await prepareBundle('ci');

  // Create manifest
  makeManifest('./package.json');

  //Log bundle size
  logBundleSize();

  //zip bundle
  zipBundle();

  //upload to fdev
  await deployApp('ci');
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

async function ensureProjectBuilds() {
  const spinner = ora('Building project').start();
  const appDir = cwd();
  const rootDir = '../../';
  chdir(rootDir);
  execSync(`pnpm ci:build`);
  chdir(appDir);
  spinner.stop();
}
