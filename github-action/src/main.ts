import { execSync } from 'child_process';
import { join } from 'path';
import { getInput, debug, setFailed, setOutput, setCommandEcho } from '@actions/core';
import * as github from '@actions/github';

const run = async (): Promise<void> => {
  try {
    setCommandEcho(true);
    const turboCommand = getInput('turbo-command', { required: true });
    const workingDirectory = getInput('working-directory', { required: false }) ?? './';

    const cwd = join(process.cwd(), workingDirectory);

    debug(`Running command: ${turboCommand} in directory ${workingDirectory}`);

    const json = execSync(`npx turbo run ${turboCommand} --dry-run=json`, {
      cwd: cwd,
      encoding: 'utf-8',
    });

    debug(`Output from Turborepo: ${json}`);

    const parsedOutput = JSON.parse(json);

    const changed = !!parsedOutput.packages.length;

    setOutput('changed', changed);
  } catch (error) {
    if (error instanceof Error || typeof error === 'string') {
      setFailed(error);
    } else {
      setFailed('Unknown error occured.');
    }
  }
};

void run();
