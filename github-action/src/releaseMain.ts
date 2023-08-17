#!/usr/bin/env node
import { readdirSync } from 'fs';
import { Command } from 'commander';
import { setSecret, warning } from '@actions/core';

import { parsePackageJson } from './utils/parsePackageJson.js';
import { prepareBundle } from './utils/prepareBundle.js';
import { makeManifest } from './utils/makeManifest.js';
import { zipBundle } from './utils/zipBundle.js';
import { uploadBundle } from './utils/uploadBundle.js';

const prodUrl = 'https://fusion-s-portal-fprd.azurewebsites.net';

const program = new Command();

program.name('Release');

program
  .command('release')
  .option('-T, --token <token>', 'change the working directory')
  .action(async (args) => {
    if (!args.token) {
      throw new Error('Missing az token');
    }
    setSecret(args.token);
    release(args.token);
  });

await program.parseAsync();

export async function release(token: string) {
  const r = parsePackageJson();
  if (!r.name) {
    throw new Error(
      `No name in package json, cannot deploy unknown app at path ${process.cwd()}`
    );
  }

  if (shouldSkipProd()) {
    warning(`Prod skipped for ${r.name} because a prod.skip file was found`);
    return;
  }

  prepareBundle();

  makeManifest('./package.json');

  const zipped = zipBundle();

  await uploadBundle(prodUrl, token, r.name, zipped);
}

function shouldSkipProd() {
  const files = readdirSync('./');
  const prodSkip = files.find((s) => s === 'prod.skip');
  return !!prodSkip;
}
