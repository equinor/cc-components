#!/usr/bin/env node

import { execSync } from 'child_process';
import { readAllAppKeys } from './readAllAppKeys.js';

//TODO: make cli or something
(async () => {
  const apps = readAllAppKeys();
  console.log(`Patching admins for ${apps.length} apps`);

  //   execSync('fdev portal admins add -e <env> -k tags -u <id>', { stdio: 'inherit' });
})();
