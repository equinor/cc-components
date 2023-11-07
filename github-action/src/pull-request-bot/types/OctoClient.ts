import { getOctokit } from '@actions/github';

export type OctoClient = ReturnType<typeof getOctokit>;
