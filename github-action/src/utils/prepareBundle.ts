import { execSync } from 'child_process';
import { notice } from '@actions/core';

export function prepareBundle() {
  notice('bundling application');
  execSync('pnpm vite build --logLevel silent', { stdio: 'inherit' });
}
