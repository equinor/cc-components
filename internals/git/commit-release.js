import { execSync } from 'child_process';
import { parsePackageJson } from '../utils/parsePackageJson.js';

function commitRelease() {
  const res = execSync('git branch --show-current');

  if ('main' !== res.toString('utf-8').trim()) {
    invalidBranch();
  }

  execSync('git pull');
  execSync('git add .');
  const { name, version } = parsePackageJson('./package.json');
  const release = `${name}@${version}`;

  execSync(`git commit -m \"chore: release ${release}\"`);
}

function invalidBranch() {
  console.error(`
  **************************************************************
  Command failed!
  Reason:
  Commit releases can only be done from main branch
  **************************************************************
  
  `);
  throw new Error('Commit-releases can only be done from main branch');
}

commitRelease();
