import { OctoClient } from '../../types/OctoClient.js';
import { commentIssue } from '../../utils/commentpr.js';
import { getDiff } from '../../utils/getDiff.js';

export async function infoAction(client: OctoClient) {
  commentIssue(client, infoTxt);
  const files = await getDiff(client);
  console.log(`Files changed = `, files);
}

const infoTxt = `
Beep boop🤖
I am the PR-bot

Available commands are:
Deploy test🚀
Create fusion app
`;
