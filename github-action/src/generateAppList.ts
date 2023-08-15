import { setSecret } from '@actions/core';
import { AppInfo, readAllAppKeys } from './readAllAppKeys.js';
import { Octokit } from '@octokit/core';
import { Command } from 'commander';
import { markdownTable } from 'markdown-table';

const program = new Command();

program.name('Applist generator');

program
  .command('applist')
  .option('-T, --token <token>', 'change the working directory')
  .action(async (args) => {
    if (!args.token) {
      throw new Error('Missing github token');
    }
    setSecret(args.token);
    generateAppList(args.token);
  });

await program.parseAsync();

function generateAppList(token: string) {
  patchReadme(token);
}

type OctokitResponse = {
  name: string;
  path: string;
  sha: string;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string;
  type: string;
  content: string;
  encoding: 'base64';
};

async function patchReadme(token: string) {
  const client = new Octokit({ auth: token });
  try {
    const res = await client.request(
      'GET /repos/equinor/cc-components/contents/README.md'
    );

    const { path, sha, content, encoding } = res.data as OctokitResponse;
    const rawContent = Buffer.from(content, encoding).toString();
    const startIndex = rawContent.indexOf('## Apps');

    const updatedContent = `${
      startIndex === -1 ? rawContent : rawContent.slice(0, startIndex)
    }\n## Apps\n${formatAppKeys(readAllAppKeys())}`;

    commitNewReadme(client, path, sha, encoding, updatedContent);
  } catch (e) {
    console.log(e);
  }
}

function formatAppKeys(apps: AppInfo[]) {
  const headers = ['Key', 'Display name', 'Production', 'Halt reason'];

  return markdownTable([
    headers,
    ...apps.map((s) => [
      `[${s.key}](${s.readme})`,
      s.displayName,
      s.prodSkip ? 'Temporarily disabled' : 'Yes',
      s.skipReason,
    ]),
  ]);
}

async function commitNewReadme(
  client: Octokit,
  path: string,
  sha: string,
  encoding: 'base64',
  updatedContent: string
) {
  try {
    await client.request(`PUT /repos/equinor/cc-components/contents/README.md`, {
      message: 'Update README',
      content: Buffer.from(updatedContent, 'utf-8').toString(encoding),
      path,
      sha,
    });
  } catch (err) {
    console.log(err);
  }
}
