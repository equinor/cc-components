import { execSync } from 'child_process';
import { parsePackageJson } from '../utils/parsePackageJson';
import ora from 'ora';

export function createRelease() {
  const { version, name } = parsePackageJson();
  const spinner = ora().start('Staging files');
  /**Ensure repo set */
  execSync('gh repo set-default');
  /** Create github release */
  execSync(`gh release create ${name}@v${version} --latest --target=main --notes '.'`);
  spinner.succeed('Github release created');
}
