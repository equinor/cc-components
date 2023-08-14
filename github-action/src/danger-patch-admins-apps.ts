#!/usr/bin/env node

import { execSync } from 'child_process';

//TODO: make cli or something
(() => {
  execSync('fdev portal admins add -e <env> -k tags -u <id>', { stdio: 'inherit' });
})();
