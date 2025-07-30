#!/usr/bin/env node
import { HttpClient } from '@actions/http-client';
import { readdirSync } from 'fs';
import { Command } from 'commander';
import { setSecret, warning } from '@actions/core';

import { parsePackageJson } from './utils/parsePackageJson.js';
import { prepareBundle } from './utils/prepareBundle.js';
import { makeManifest } from './utils/makeManifest.js';
import { zipBundle } from './utils/zipBundle.js';
import { uploadBundle } from './utils/uploadBundle.js';
import { patchAppConfig } from './utils/patchAppConfig.js';
import { execSync } from 'child_process';
import { getVersion } from './utils/bumpVersion.js';

const prodUrl = 'https://apps.api.fusion.equinor.com';

const program = new Command();

program.name('Release');

type ReleaseArgs = {
  token: string;
  ai: string;
  modelViewerConfig: string;
  pr: string;
  sha: string;
};

program
  .command('release')
  .option('-T, --token <token>', 'azure token')
  .option('--pr <pr>', 'Pr number')
  .option('--ai <ai>', 'ai key')
  .option('--modelViewerConfig <modelViewerConfig>', 'modelviewer config')
  .option('--sha <sha>', 'commit sha')
  .action(async (args) => {
    if (!args.token) {
      throw new Error('Missing az token');
    }
    const r: ReleaseArgs = args;
    setSecret(args.token);
    setSecret(args.ai);
    release(r);
  });

await program.parseAsync();

export async function release(config: ReleaseArgs) {
  const pkg = parsePackageJson();
  if (!pkg.name) {
    throw new Error(
      `No name in package json, cannot deploy unknown app at path ${process.cwd()}`
    );
  }

  if (shouldSkipProd()) {
    warning(`Prod skipped for ${pkg.name} because a prod.skip file was found`);
    return;
  }

  prepareBundle();

  const version = await getVersion(prodUrl, config.token, pkg.name);
  makeManifest('./package.json', version, config.sha);

  const zipped = zipBundle();

  await uploadBundle(prodUrl, config.token, pkg.name, zipped, version);
  await patchAppConfig(
    {
      ai: config.ai,
      commit: config.sha,
      modelViewerConfig: JSON.parse(config.modelViewerConfig),
    },
    config.token,
    pkg.name,
    prodUrl
  );

  if (process.env.GITHUB_STEP_SUMMARY) {
    execSync(`echo '## ${pkg.name}' >> ${process.env.GITHUB_STEP_SUMMARY}`);
  } else {
    console.warn('GITHUB_STEP_SUMMARY is not set. Skipping step summary update.');
  }
}

function shouldSkipProd() {
  const files = readdirSync('./');
  const prodSkip = files.find((s) => s === 'prod.skip');
  return !!prodSkip;
}
