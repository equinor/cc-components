import { OctoClient } from '../types/OctoClient';
import { getDiff } from './getDiff.js';

const deployMentLibs = ['apps', 'libs', 'reports'];
export type Action = {
  command: string;
  description: string;
};

export async function getAvailableActionsAsync(client: OctoClient): Promise<Action[]> {
  const actions: Action[] = [];

  const deployTestAction = await getDeployTestActionAsync(client);
  if (deployTestAction) {
    actions.push(deployTestAction);
  }

  return actions;
}

async function getDeployTestActionAsync(client: OctoClient): Promise<Action | undefined> {
  const files = await getDiff(client);
  const isAppLibTouched = files.some((s) =>
    deployMentLibs.includes(s.filename.split('/')[0])
  );
  if (isAppLibTouched) {
    return {
      command: 'Deploy test',
      description: 'Will deploy changed apps to Fusion CI',
    };
  } else {
    return undefined;
  }
}
