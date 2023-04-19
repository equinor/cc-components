import { execSync } from 'child_process';
import ora from 'ora';

export function pullChanges() {
  const spinner = ora().start('Pulling github changes');
  execSync('git pull');
  spinner.succeed('Remote and local branch synced');
}
