import { execSync } from 'child_process';

function commitRelease() {
  execSync('git push');
}

commitRelease();
