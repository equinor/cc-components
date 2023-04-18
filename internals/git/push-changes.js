import { execSync } from 'child_process';

function pushChanges() {
  execSync('git push');
}

pushChanges();
