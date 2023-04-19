import { execSync } from 'child_process';

export function pushChanges() {
  execSync('git push');
}
