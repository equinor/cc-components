#!/usr/bin/env node

import { Command } from 'commander';
import pkgJson from '../package.json' assert { type: 'json' };

import { release } from './commands/release.js';

const program = new Command();

program.name('CC-components-cli');
program.description('CLI for CC-components');
program.version(pkgJson.version);

program.command('release').action(() => {
  release();
});

program.parse();
