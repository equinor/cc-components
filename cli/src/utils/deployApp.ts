import { execSync } from 'child_process';
import ora from 'ora';
import { parsePackageJson } from './parsePackageJson.js';

export function deployApp() {
  const spinner = ora().start('Uploading bundle to fdev');
  const { name } = parsePackageJson();
  if (!name) throw new Error('Missing name in package.json');
  execSync(`fdev portal upload -e ci -k ${name} dist/bundle.zip`);
  spinner.succeed('Bundle uploaded');
}
