import { execSync } from 'child_process';
import { commitRelease } from './commit-release';
import { pushChanges } from './push-changes';

export function release() {
  //bump version
  execSync('pnpm version patch');
  //vite build
  execSync('vite build');
  //create commit
  commitRelease();
  //upload
  console.log('Uploading to fdev something');
  //push commit
  pushChanges();
}
