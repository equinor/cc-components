#!/usr/bin/env node
import { Command } from 'commander';
import { infoAction } from './actions/info/info.js';
import { setSecret } from '@actions/core';
import { getOctokit } from '@actions/github';

const program = new Command();

program.name('bot');

program
  .command('deploy-test')
  .option('-T, --token <token>', 'change the working directory')
  .action(async (args) => {
    // setSecret(args.token);
    //do action
  });

program
  .command('info')
  .option('-T, --token <token>', 'change the working directory')
  .action(async (args) => {
    setSecret(args.token);
    const client = getOctokit(args.token);
    await infoAction(client);
  });

await program.parseAsync();
