import { context, getOctokit } from '@actions/github';

/**
 * Creates a comment on an issue/PR
 */
export function commentIssue(token: string, body: string) {
  const client = getOctokit(token);
  client.rest.issues.createComment({
    owner: context.repo.owner,
    repo: context.repo.repo,
    issue_number: context.issue.number,
    body: body,
  });
}
