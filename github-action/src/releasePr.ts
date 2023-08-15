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
  logInfo("Deployment succesful", "Green");
  console.log("Some random normal message"),
  logInfo("Uh-oh 403 sp dead", "Red")
  // prepareBundle();

  // makeManifest('./package.json');

  // const zipped = zipBundle();

  // const r = parsePackageJson();
  // if (!r.name) {
  //   throw new Error(
  //     `No name in package json, cannot deploy unknown app at path ${process.cwd()}`
  //   );
  // }

  // await uploadBundle(ciUrl, token, r.name, zipped);
  // await patchWithPrNumber(prNumber, token, r.name);
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
    throw new Error(
      `Failed to patch client config with pr number, ${await patchResponse.readBody()}`
    );
  }
}

const ColorReset = '\x1b[0m';
type TextColor =
  | 'Red'
  | 'Green'
  | 'Black'
  | 'Yellow'
  | 'Blue'
  | 'Magenta'
  | 'Cyan'
  | 'White';

const textColor = {
  Red: '\x1b[31m',
  Black: '\x1b[30m',
  Green: '\x1b[32m',
  Yellow: '\x1b[33m',
  Blue: '\x1b[34m',
  Magenta: '\x1b[35m',
  Cyan: '\x1b[36m',
  White: '\x1b[37m',
} satisfies Record<TextColor, string>;

export function logInfo(message: string, color: TextColor): void {
  console.log(`${textColor[color]}${message}${ColorReset}`);
}
