import { parsePackageJson } from './parsePackageJson.js';
import fs from 'fs';
import { notice } from '@actions/core';

export function makeManifest(path: string) {
  // Create manifest
  notice('making manifest');
  const { version, name, ...maybe } = parsePackageJson(path);
  if (!version || !name) {
    throw new Error('Name or version missing in package.json');
  }
  const { major, minor, patch } = splitVersions(version);

  /** Some app-manifests have custom short and displaynames */
  const shortName = maybe?.['shortName'] ?? name;
  const displayName = maybe?.['displayName'] ?? name[0].toUpperCase() + name.slice(1);

  const manifest = {
    //required
    entryPoint: "app-bundle.js",
    //required
    version: version,
    //TODO: add commit sha and github repo
    //timestamp: "string",
    //commitSha: "string",
    //githubRepo: "string",
  };

  const data = JSON.stringify(manifest, null, 2);

  fs.writeFileSync('./dist/app-manifest.json', data);
}

function splitVersions(version: string) {
  const [major, minor, patch] = version.split('.');
  return {
    major,
    minor,
    patch,
  };
}
