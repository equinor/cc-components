import { commentIssue } from '../../utils/commentpr.js';

export async function infoAction(token: string) {
  commentIssue(token, infoTxt);
}

const infoTxt = `
Beep boop🤖
I am the PR-bot

Available commands are:
Deploy test🚀
Create fusion app
`;
