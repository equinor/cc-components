#!/usr/bin/env node

import { Command } from 'commander';
import pkgJson from '../package.json' assert { type: 'json' };

import { release } from './commands/release.js';

import prompt from 'prompts';

const program = new Command();

program.name('CC-components-cli');
program.description('CLI for CC-components');
program.version(pkgJson.version);

export type VersionIncrement = 'major' | 'minor' | 'patch';

program
  .command('release')
  .option('-dry --dry', 'skip release', false)
  .action(async ({ dry }) => {
    const { value: env } = await prompt({
      type: 'select',
      name: 'value',
      message: 'Choose an environment',
      choices: [
        { title: 'CI', value: 'ci' },
        { title: 'Production', value: 'fprd' },
        { title: 'QA', value: 'fqa', disabled: true },
      ],
      initial: 0,
    });

    const { value: versionInc } = await prompt({
      type: 'select',
      name: 'value',
      message: 'Choose version bump',
      choices: [
        { title: 'Patch', value: 'patch' },
        { title: 'Minor', value: 'minor' },
        { title: 'Major', value: 'major' },
      ],
      initial: 0,
    });

    await release(dry, env, versionInc);
  });

await program.parseAsync();
