import { context } from '@actions/github';
import { OctoClient } from '../types/OctoClient';

export async function getDiff(client: OctoClient) {
  const result = await client.rest.repos.compareCommits({
    repo: context.repo.repo,
    owner: context.repo.owner,
    head: context.payload.pull_request.head.sha,
    base: context.payload.pull_request.base.sha,
    per_page: 100,
  });

  return result.data.files || [];
}
