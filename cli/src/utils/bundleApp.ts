import { execSync } from 'child_process';
import ora from 'ora';

export function bundleApp() {
  const spinner = ora('Bundling application').start();
  execSync('vite build --logLevel silent');
  spinner.stop();
}
