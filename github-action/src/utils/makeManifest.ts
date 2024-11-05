import { parsePackageJson } from './parsePackageJson.js';
import fs from 'fs';
import { notice } from '@actions/core';

export function makeManifest(path: string, version: string, sha: string) {
  // Create manifest
  notice('making manifest');
  const { name } = parsePackageJson(path);
  if (!version || !name) {
    throw new Error('Name or version missing in package.json');
  }
  const manifest = {
    //required
    entryPoint: "app-bundle.js",
    //required
    version: version,
    githubRepo: "https://github.com/equinor/cc-components",
    //TODO: add commit sha and github repo
    timestamp: new Date().toISOString(),
    commitSha: sha,
  };

  const data = JSON.stringify(manifest, null, 2);

  fs.writeFileSync('./dist/app-manifest.json', data);
}

