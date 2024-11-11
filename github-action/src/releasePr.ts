#!/usr/bin/env node

import { Command } from 'commander';
import { setSecret } from '@actions/core';
import { parsePackageJson } from './utils/parsePackageJson.js';
import { prepareBundle } from './utils/prepareBundle.js';
import { makeManifest } from './utils/makeManifest.js';
import { zipBundle } from './utils/zipBundle.js';
import { uploadBundle } from './utils/uploadBundle.js';
import { patchAppConfig } from './utils/patchAppConfig.js';
import { execSync } from 'child_process';
import { getVersion } from './utils/bumpVersion.js';

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
  const pkg = parsePackageJson();
  if (!pkg.name) {
    throw new Error(
      `No name in package json, cannot deploy unknown app at path ${process.cwd()}`
    );
  }

  const version = await getVersion(ciUrl, context.token, pkg.name);
  makeManifest('./package.json', version, context.sha);
  const zipped = zipBundle();
  await uploadBundle(ciUrl, context.token, pkg.name, zipped, version);
  await patchAppConfig(
    {
      ai: context.ai,
      commit: context.sha,
      pr: context.pr,
      modelViewerConfig: JSON.parse(context.modelViewerConfig),
    },
    context.token,
    pkg.name,
    ciUrl
  );

  execSync(`echo '## ${pkg.name}' >> $GITHUB_STEP_SUMMARY`);
}


