import { execSync } from 'child_process';
import { parsePackageJson } from '../utils/parsePackageJson.js';
import { pushChanges } from './push-changes.js';

export function commitRelease() {
  const res = execSync('git branch --show-current');

  if ('main' !== res.toString('utf-8').trim()) {
    invalidBranch();
  }

  execSync('git add .');
  const { name, version } = parsePackageJson('./package.json');
  const release = `${name}@${version}`;

  const releaseMessage = `chore: release ${release}`;

  console.log(`Creating git commit: ${releaseMessage}}`);
  execSync(`git commit -m \"${releaseMessage}\"`);

  return () => {
    const res = execSync('git branch --show-current');
    if ('main' !== res.toString('utf-8').trim()) {
      invalidBranch();
    }
    pushChanges();
  };
}

function invalidBranch() {
  return;
  console.error(`
  **************************************************************
  Command failed!
  Reason:
  Commit releases can only be done from main branch
  **************************************************************
  
  `);
  throw new Error('Commit-releases can only be done from main branch');
}
