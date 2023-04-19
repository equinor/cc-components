import { execSync } from 'child_process';
import ora from 'ora';

export function compileApp() {
  const spinner = ora().start('Compiling app');
  execSync('tsc -b');
  spinner.succeed('Compiled successfully');
}
