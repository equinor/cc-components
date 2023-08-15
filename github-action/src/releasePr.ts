#!/usr/bin/env node

import { Command } from 'commander';
import { HttpClient } from '@actions/http-client';
import { OutgoingHttpHeaders } from 'http';
import { setSecret } from '@actions/core';
import { parsePackageJson } from './utils/parsePackageJson.js';
import { prepareBundle } from './utils/prepareBundle.js';
import { makeManifest } from './utils/makeManifest.js';
import { zipBundle } from './utils/zipBundle.js';
import { uploadBundle } from './utils/uploadBundle.js';
import { logInfo } from './utils/logInfo.js';

const ciUrl = 'https://fusion-s-portal-ci.azurewebsites.net';

const program = new Command();

program.name('Release');

program
  .command('release')
  .option('-T, --token <token>', 'change the working directory')
  .option('-pr --pr <pr>', 'Pr number')
  .action(async (args) => {
    if (!args.token) {
      throw new Error('Missing az token');
    }
    setSecret(args.token);
    release(args.token, args.pr);
  });

await program.parseAsync();

export async function release(token: string, prNumber: string) {
  prepareBundle();
  makeManifest('./package.json');
  const zipped = zipBundle();
  const r = parsePackageJson();
  if (!r.name) {
    throw new Error(
      `No name in package json, cannot deploy unknown app at path ${process.cwd()}`
    );
  }
  await uploadBundle(ciUrl, token, r.name, zipped);
  await patchWithPrNumber(prNumber, token, r.name);
}

async function patchWithPrNumber(prNumber: string, token: string, appKey: string) {
  const client = new HttpClient();

  const headers: OutgoingHttpHeaders = {
    ['Authorization']: `Bearer ${token}`,
    ['Content-Type']: 'application/json',
  };

  //Download current config
  const res = await client.get(`${ciUrl}/api/apps/${appKey}/config`, headers);
  if (res.message.statusCode !== 200) {
    logInfo(`Failed to fetch client config, Code: ${res.message.statusCode}`, 'Red');
    throw new Error('Failed to fetch client config');
  }
  const config = JSON.parse(await res.readBody());
  config.environment = { ...config.environment, pr: prNumber };
  //append pr

  //patch
  const patchResponse = await client.put(
    `${ciUrl}/api/apps/${appKey}/config`,
    JSON.stringify(config),
    headers
  );
  if (patchResponse.message.statusCode !== 200) {
    logInfo(
      `Failed to patch client config with pr number, Code: ${patchResponse.message.statusCode}`,
      'Red'
    );
    throw new Error(
      `Failed to patch client config with pr number, ${await patchResponse.readBody()}`
    );
  }
  logInfo(
    `Sucessfully patched client config for ${appKey} with pr number ${prNumber}`,
    'Green'
  );
}
