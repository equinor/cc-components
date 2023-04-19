import ora from 'ora';
import { parsePackageJson } from './parsePackageJson.js';
import { execSync } from 'child_process';

export function patchVersion() {
  const { version, name } = parsePackageJson();
  if (!version) throw new Error('Version missing in package json');
  const spinner = ora().start('Patching version');
  execSync('pnpm version patch');
  const { version: newVersion } = parsePackageJson();
  if (!newVersion) throw new Error('Failed to patch version');
  spinner.succeed(`${name}@${version} -> ${name}@${newVersion}`);
}
