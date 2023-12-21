import { execSync } from 'child_process';
import { notice } from '@actions/core';

export function prepareBundle() {
  notice('bundling application');
  execSync('node -v', { stdio: 'inherit' });
  execSync('pnpm vite build --logLevel silent', { stdio: 'inherit' });
}
