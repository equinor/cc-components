import { context } from '@actions/github';
import { OctoClient } from '../types/OctoClient';

export type File = {
  sha: string;
  filename: string;
  status:
    | 'added'
    | 'removed'
    | 'modified'
    | 'renamed'
    | 'copied'
    | 'changed'
    | 'unchanged';
  additions: number;
  deletions: number;
  changes: number;
  blob_url: string;
  raw_url: string;
  contents_url: string;
  patch?: string;
  previous_filename?: string;
};

export async function getDiff(client: OctoClient): Promise<File[]> {
  const result = await client.rest.repos.compareCommits({
    repo: context.repo.repo,
    owner: context.repo.owner,
    head: context.payload.pull_request.head.sha,
    base: context.payload.pull_request.base.sha,
    per_page: 100,
  });

  return result.data.files || [];
}
