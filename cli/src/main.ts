#!/usr/bin/env node

import { Command } from 'commander';
import pkgJson from '../package.json' assert { type: 'json' };

import { release } from './commands/release.js';

import prompt from 'prompts';

const program = new Command();

program.name('CC-components-cli');
program.description('CLI for CC-components');
program.version(pkgJson.version);

program
  .command('release')
  .option('-dry --dry', 'skip release', false)
  .action(async ({ dry }) => {
    setTimeout(async () => {
      await prompt({
        type: 'select',
        name: 'value',
        message: 'Choose an environment',
        choices: [
          { title: 'CI', value: 'ci' },
          { title: 'Production', value: 'fprd' },
          { title: 'QA', value: 'fqa', disabled: true },
        ],
        initial: 0,
      }).then(async ({ value }) => {
        await release(dry, value);
      });
    }, 5000);
  });

await program.parseAsync();
