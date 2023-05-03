import ora from 'ora';
import { parsePackageJson } from './parsePackageJson.js';
import { execSync } from 'child_process';
import { VersionIncrement } from '../main.js';

export function patchVersion(versionInc: VersionIncrement) {
  const { version, name } = parsePackageJson();
  if (!version) throw new Error('Version missing in package json');
  const spinner = ora().start('Patching version');
  execSync(`pnpm version ${versionInc}`);
  const { version: newVersion } = parsePackageJson();
  if (!newVersion) throw new Error('Failed to patch version');
  spinner.succeed(`${name}@${version} -> ${name}@${newVersion}`);
}
