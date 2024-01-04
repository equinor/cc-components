#!/usr/bin/env node
import { readdirSync } from 'fs';
import { Command } from 'commander';
import { setSecret, warning } from '@actions/core';

import { parsePackageJson } from './utils/parsePackageJson.js';
import { prepareBundle } from './utils/prepareBundle.js';
import { makeManifest } from './utils/makeManifest.js';
import { zipBundle } from './utils/zipBundle.js';
import { uploadBundle } from './utils/uploadBundle.js';
import { patchAppConfig } from './utils/patchAppConfig.js';

const prodUrl = 'https://fusion-s-portal-fprd.azurewebsites.net';

const program = new Command();

program.name('Release');

type ReleaseArgs = {
  token: string;
  ai: string;
  pr: string;
  sha: string;
};
program
  .command('release')
  .option('-T, --token <token>', 'azure token')
  .option('-pr, --pr <pr>', 'Pr number')
  .option('-ai, --ai <ai>', 'ai key')
  .option('-sha, --sha <sha>', 'commit sha')
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

  makeManifest('./package.json');

  const zipped = zipBundle();

  await uploadBundle(prodUrl, config.token, pkg.name, zipped);
  await patchAppConfig(
    { ai: config.ai, commit: config.sha },
    config.token,
    pkg.name,
    prodUrl
  );
}

function shouldSkipProd() {
  const files = readdirSync('./');
  const prodSkip = files.find((s) => s === 'prod.skip');
  return !!prodSkip;
}
