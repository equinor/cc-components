import { execSync } from 'child_process';
import { commitRelease } from './commit-release.js';
import { pushChanges } from './push-changes.js';
import ora from 'ora';

export function release() {
  //bump version
  execSync('pnpm version patch');
  //vite build
  const spinner = ora('Bundling application').start();
  execSync('vite build');
  spinner.stop();
  //create commit
  commitRelease();
  //upload
  console.log('Uploading to fdev something');
  //push commit
  pushChanges();
}
