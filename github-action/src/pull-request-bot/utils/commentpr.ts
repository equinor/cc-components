import { context } from '@actions/github';
import { OctoClient } from '../types/OctoClient';

/**
 * Creates a comment on an issue/PR
 */
export function commentIssue(client: OctoClient, body: string) {
  client.rest.issues.createComment({
    owner: context.repo.owner,
    repo: context.repo.repo,
    issue_number: context.issue.number,
    body: body,
  });
}
