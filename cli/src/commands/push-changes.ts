import { execSync } from 'child_process';
import ora from 'ora';

export function pushChanges() {
  const spinner = ora().start('Pushing git changes');
  execSync('git push');
  spinner.succeed('Changes pushed to git');
}
