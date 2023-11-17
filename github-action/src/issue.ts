#!/usr/bin/env node

import { Command } from 'commander';
import { setSecret } from '@actions/core';
import { getOctokit, context } from '@actions/github';
import { markdownTable } from 'markdown-table';
import { logInfo } from './utils/logInfo.js';
const prodUrl = 'https://fusion-s-portal-fprd.azurewebsites.net';
const ciUrl = 'https://fusion-s-portal-ci.azurewebsites.net';
const program = new Command();

program.name('Issue');

program
  .command('issue')
  .option('-T, --token <token>', 'change the working directory')
  .option('-C --ci <ci>', 'Fusion CI token')
  .action(async (args) => {
    if (!args.token) {
      throw new Error('Missing github token');
    }
    if (!args.ci) {
      throw new Error('Missing ci token');
    }
    setSecret(args.token);
    release(args.token, args.ci);
  });

await program.parseAsync();

export async function release(token: string, ciToken: string) {
  const client = getOctokit(token);

  const apps = await getFusionApps(ciUrl, ciToken);

  const table = markdownTable([
    ['Key', 'Name', 'IsPublished'],
    ...apps.map((s) => [s.key, s.name, s.isPublished ? '✅' : '❌']),
  ]);

  const res = await client.rest.issues.update({
    issue_number: 693,
    owner: context.repo.owner,
    repo: context.repo.repo,
    title: 'Fusion app status',
    body: table,
  });

  if (res.status !== 200) {
    logInfo(res.status, 'Red');
    throw new Error('Failed to update issue');
  }
}

export async function getFusionApps(
  baseUrl: string,
  token: string
): Promise<IssueFusionApp[]> {
  const headers = {
    ['content-type']: 'application/json',
    ['Authorization']: `Bearer ${token}`,
  };

  const res = await fetch(`${baseUrl}/api/admin/apps`, {
    headers: headers,
  });

  const data = (await res.json()).map(
    (s: FusionApp): IssueFusionApp => ({
      name: s.name,
      key: s.key,
      isPublished: !!s.publishedDate,
    })
  );
  return data;
}

type FusionApp = {
  name: string;
  key: string;
  publishedDate: string | null;
};

type IssueFusionApp = {
  name: string;
  key: string;
  isPublished: boolean;
};
