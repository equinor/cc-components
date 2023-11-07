import { OctoClient } from '../../types/OctoClient.js';
import { commentIssue } from '../../utils/commentpr.js';
import { getDiff } from '../../utils/getDiff.js';

const deployMentLibs = ['apps', 'libs', 'reports'];

export async function infoAction(client: OctoClient) {
  commentIssue(client, infoTxt);
  const files = await getDiff(client);
  const isAppLibTouched = files.some((s) =>
    deployMentLibs.includes(s.filename.split('/')[0])
  );

  if (isAppLibTouched) {
    commentIssue(
      client,
      'Looks like you touched some app code, deploy test is now available'
    );
  } else {
    commentIssue(client, 'You didnt touch any code? Deploy test unavailable');
  }
}

const infoTxt = `
Beep boop🤖
I am the PR-bot

Available commands are:
Deploy test🚀
Create fusion app
`;
