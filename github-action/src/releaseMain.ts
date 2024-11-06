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


function incrementPatchVersion(semver: string) {
  const parts = semver.split('.');
  if (parts.length !== 3) {
    throw new Error('Invalid semver format');
  }
  const patch = parseInt(parts[2], 10) + 1;
  return `${parts[0]}.${parts[1]}.${patch}`;
}

async function getVersion(ciUrl: string, token: string, name: string) {
  const client = new HttpClient();
  const response = await client.get(`${ciUrl}/apps/${name}?api-version=1.0`, {
    ['Authorization']: `Bearer ${token}`,
  });
  const body = await response.readBody();
  const json = JSON.parse(body);
  const v = incrementPatchVersion(json.build.version);
  return v;
}



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

  execSync(`echo '## ${pkg.name}' >> $GITHUB_STEP_SUMMARY`);
}

function shouldSkipProd() {
  const files = readdirSync('./');
  const prodSkip = files.find((s) => s === 'prod.skip');
  return !!prodSkip;
}
