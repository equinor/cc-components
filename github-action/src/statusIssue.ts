#!/usr/bin/env node
import { Command } from 'commander';
import { setSecret } from '@actions/core';
import { getOctokit, context } from '@actions/github';
import { markdownTable } from 'markdown-table';

const program = new Command();

program.name('Issue');

program
  .command('issue')
  .option('-T, --token <token>', 'change the working directory')
  .action(async (args) => {
    if (!args.token) {
      throw new Error('Missing az token');
    }
    setSecret(args.token);
    release(args.token);
  });

await program.parseAsync();

export async function release(token: string) {
  const client = getOctokit(token);

  const table = markdownTable([['Test', 'value']]);

  client.rest.issues.update({
    issue_number: 693,
    owner: context.repo.owner,
    repo: context.repo.repo,
    title: 'Fusion app status',
    body: table,
  });
}
