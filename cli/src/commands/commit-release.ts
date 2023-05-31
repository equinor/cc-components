import { execSync } from 'child_process';
import { parsePackageJson } from '../utils/parsePackageJson.js';
import ora from 'ora';

export function commitRelease() {
  const res = execSync('git branch --show-current');

  if ('main' !== res.toString('utf-8').trim()) {
    invalidBranch();
  }

  const spinner = ora().start('Staging files');
  execSync('git add .');
  spinner.succeed('Succesfully staged files');

  const { name, version } = parsePackageJson('./package.json');
  const release = `${name}@${version}`;

  const releaseMessage = `chore: release ${release}`;

  ora().start(`Creating git commit: ${releaseMessage}}`).stop();

  const spinner2 = ora().start('Comitting staged files');
  execSync(`git commit -m \"${releaseMessage}\"`);
  spinner2.succeed('Succesfully commited staged files');
}

function invalidBranch() {
  //TODO: reset package.json
  console.error(`
    **************************************************************
    Command failed!
    Reason:
    Commit releases can only be done from main branch
    **************************************************************

    `);
  throw new Error('Commit-releases can only be done from main branch');
}
