#!/usr/bin/env node

import { Command } from 'commander';
import pkgJson from '../package.json' assert { type: 'json' };

import { makeManifest } from './commands/make-app-manifest.js';
import { commitRelease } from './commands/commit-release.js';
import { pushChanges } from './commands/push-changes.js';
import { release } from './commands/release.js';

const program = new Command();

program.name('CC-components-cli');
program.description('CLI for CC-components');
program.version(pkgJson.version);

program
  .command('make-manifest')
  .description('Creates an app-manifest.json from package.json')
  .option('-p --path <string>', 'package.json location', './package.json')
  .action(({ path }) => {
    makeManifest(path);
  });

program
  .command('commit-release')
  .description('Creates a release commit')
  .action(() => {
    commitRelease();
  });

program
  .command('push-changes')
  .description('Creates a release commit')
  .action(() => {
    pushChanges();
  });

program.command('release').action(() => {
  release();
});

// program
//   .command('deploy')
//   .description('Deploy app to fusion CI')
//   .option('--dry', 'Dry run', false)
//   .action(({ dry }) => {
//     console.log(dry);
//   });

program.parse();
