import { OctoClient } from '../../types/OctoClient.js';
import { commentIssue } from '../../utils/commentpr.js';
import { getAvailableActionsAsync } from '../../utils/getAvailableActions.js';

export async function infoAction(client: OctoClient) {
  const actions = await getAvailableActionsAsync(client);

  commentIssue(
    client,
    infoTxt + actions.map((s) => `${s.command} (${s.description})`).join('\r\n')
  );
}

const infoTxt = `
Beep boop🤖
I am the PR-bot

Available commands are:
`;
