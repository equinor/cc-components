import { execSync } from 'child_process';
import fs from 'fs';

function commitRelease() {
  const res = execSync('git branch --show-current');

  if ('main' !== res.toString('utf-8')) {
    console.error(`
**************************************************************
Command failed!
Reason:
Commit releases can only be done from main branch
**************************************************************

`);
    throw new Error('Commit-releases can only be done from main branch');
  }

  execSync('git add .');
  const blob = fs.readFileSync('./package.json');
  const { version, name } = JSON.parse(blob.toString('utf8'));
  const release = `${name}@${version}`;

  execSync(`git commit -m \"chore: release ${release}\"`);
}

commitRelease();
