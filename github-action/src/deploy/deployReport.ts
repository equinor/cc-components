#!/usr/bin/env node
import { setSecret, warning } from '@actions/core';
import { Command } from 'commander';
import { readdirSync } from 'fs';

import { parsePackageJson } from '../utils/parsePackageJson.js';
import { prepareBundle } from '../utils/prepareBundle.js';
import { makeManifest } from '../utils/makeManifest.js';
import { zipBundle } from '../utils/zipBundle.js';
import { uploadBundle } from '../utils/uploadBundle.js';
import { getVersion } from '../utils/bumpVersion.js';

const fusionEnv = {
  ci: {
    url: 'https://apps.ci.api.fusion-dev.net',
  },
  fprd: {
    url: 'https://apps.api.fusion.equinor.com',
  },
};

type FusionEnv = keyof typeof fusionEnv;

function isFusionEnv(env: unknown): env is FusionEnv {
  return typeof env === 'string' && Object.keys(fusionEnv).includes(env);
}

const getFusionUrl = (env: FusionEnv) => fusionEnv[env].url;

const program = new Command();

program.name('Deploy Report');

program
  .command('deploy')
  .option('-T, --token <token>', 'ad token')
  .option('-E --env <env>', 'Fusion env')
  .option('--sha <sha>', 'commit sha')
  .action(async (args) => {
    if (!args.token) {
      throw new Error('Missing az token');
    }
    const env = args.env;
    if (!env) {
      throw new Error('Fusion env missing');
    }
    if (!isFusionEnv(env)) {
      throw new Error(`Invalid fusion env ${env}`);
    }
    setSecret(args.token);
    deploy(args.token, env, args.sha);
  });

await program.parseAsync();

export async function deploy(token: string, env: FusionEnv, sha: string) {
  const pkg = parsePackageJson();
  if (!pkg.name) {
    throw new Error(
      `No name in package json, cannot deploy unknown app at path ${process.cwd()}`
    );
  }

  const url = getFusionUrl(env);
  const version = await getVersion(url, token, pkg.name);

  prepareBundle();
  makeManifest('./package.json', version, sha);
  const zipped = zipBundle();

  if (shouldSkipDeploy(env)) {
    warning(`Deployment skipped for ${pkg.name} because a ${env}.skip file exists`);
    return;
  }

  await uploadBundle(url, token, pkg.name, zipped, version);
}

function shouldSkipDeploy(env: FusionEnv) {
  const files = readdirSync('./');
  const prodSkip = files.find((s) => s === `${env}.skip`);
  return !!prodSkip;
}
