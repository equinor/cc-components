#!/usr/bin/env node

import { Command } from 'commander';
import { setSecret } from '@actions/core';
import { HttpClient } from '@actions/http-client';
import { parsePackageJson } from './utils/parsePackageJson.js';
import { prepareBundle } from './utils/prepareBundle.js';
import { makeManifest } from './utils/makeManifest.js';
import { zipBundle } from './utils/zipBundle.js';
import { uploadBundle } from './utils/uploadBundle.js';
import { patchAppConfig } from './utils/patchAppConfig.js';
import { execSync } from 'child_process';

const ciUrl = 'https://apps.ci.api.fusion-dev.net';

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
  .option('-pr, --pr <pr>', 'Pr number')
  .option('-ai, --ai <ai>', 'ai key')
  .option(
    '-modelViewerConfig, --modelViewerConfig <modelViewerConfig>',
    'modelviewer config'
  )
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

export async function release(context: ReleaseArgs) {
  prepareBundle();
  const r = parsePackageJson();
  if (!r.name) {
    throw new Error(
      `No name in package json, cannot deploy unknown app at path ${process.cwd()}`
    );
  }

  const version = await getVersion(ciUrl, context.token, r.name);
  makeManifest('./package.json', version);
  const zipped = zipBundle();
  await uploadBundle(ciUrl, context.token, r.name, zipped, version);
  console.log("Skipping patchAppConfig");
  // await patchAppConfig(
  //   {
  //     ai: context.ai,
  //     commit: context.sha,
  //     pr: context.pr,
  //     modelViewerConfig: JSON.parse(context.modelViewerConfig),
  //   },
  //   context.token,
  //   r.name,
  //   ciUrl
  // );

  execSync(`echo '## ${r.name}' >> $GITHUB_STEP_SUMMARY`);
}


async function getVersion(ciUrl: string, token: string, name: string) {
  const client = new HttpClient();
  const response = await client.get(`${ciUrl}/apps/${name}?api-version=1.0`, {
    ['Authorization']: `Bearer ${token}`,
  });
  const body = await response.readBody();
  const json = JSON.parse(body);
  console.log(`Latest version is ${json.build.version}`);
  const v = incrementPatchVersion(json.build.version);
  console.log(`Incrementing to ${v}`);
  return v;
}

function incrementPatchVersion(semver: string) {
  const parts = semver.split('.');
  if (parts.length !== 3) {
    throw new Error('Invalid semver format');
  }
  const patch = parseInt(parts[2], 10) + 1;
  return `${parts[0]}.${parts[1]}.${patch}`;
}
