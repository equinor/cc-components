#!/usr/bin/env node

import { Command } from 'commander';
import fs from 'fs';
import { chdir, cwd } from 'process';
import { execSync } from 'child_process';
import { parsePackageJson } from './parsePackageJson.js';
import { resolve } from 'path';
import AdmZip from 'adm-zip';
import { HttpClient } from '@actions/http-client';
import { OutgoingHttpHeaders } from 'http';
import { Readable } from 'stream';
import { notice, setSecret } from '@actions/core';

const program = new Command();

program.name('Release');

program
  .command('release')
  .option('-T, --token <token>', 'change the working directory')
  .action(async (args) => {
    if (!args.token) {
      throw new Error('Missing az token');
    }
    setSecret(args.token);
    release(args.token);
  });

await program.parseAsync();

export async function release(token: string) {
  notice('building app');
  execSync('tsc -b -f');

  notice('building project');
  ensureProjectBuilds();

  //   //Vite build
  notice('bundling application');
  prepareBundle();

  //   // Create manifest
  notice('making manifest');
  makeManifest('./package.json');

  //   //zip bundle
  notice('zipping bundle');
  const zipped = zipBundle();

  const r = parsePackageJson();

  await uploadBundle(token, r.name, zipped);
}

async function uploadBundle(token: string, appKey: string, zipped: AdmZip) {
  const client = new HttpClient();

  const headers: OutgoingHttpHeaders = {
    ['Authorization']: `Bearer ${token}`,
    ['Content-Type']: 'application/zip',
    ['Content-Disposition']: 'attachment; filename=bundle.zip',
  };

  const stream = Readable.from(zipped.toBuffer());

  const r = await client.sendStream(
    'POST',
    `https://fusion-s-portal-ci.azurewebsites.net/api/apps/${appKey}/versions`,
    stream,
    headers
  );

  notice(`bundle uploaded with status code ${r.message.statusCode}`);
  if (r.message.statusCode !== 200) {
    throw new Error('Bundle failed to upload, fatal error');
  }

  //   /** Publish bundle */
  //   const publishResponse = await client.post(
  //     `https://fusion-s-portal-ci.azurewebsites.net/api/apps/${appKey}/publish`,
  //     '',
  //     headers
  //   );
}

function prepareBundle() {
  const { name } = parsePackageJson();
  if (!name) {
    throw new Error('Missing name in package.json');
  }
  execSync('vite build --logLevel silent');
}

function ensureProjectBuilds() {
  const appDir = cwd();
  const rootDir = '../../';
  chdir(rootDir);
  execSync(`pnpm ci:build`);
  chdir(appDir);
}

export function makeManifest(path: string) {
  const { version, name, ...maybe } = parsePackageJson(path);
  if (!version || !name) {
    throw new Error('Name or version missing in package.json');
  }
  const { major, minor, patch } = splitVersions(version);

  /** Some app-manifests have custom short and displaynames */
  const shortName = maybe?.['shortName'] ?? name;
  const displayName = maybe?.['displayName'] ?? name[0].toUpperCase() + name.slice(1);

  const manifest = {
    name: displayName,
    shortName: shortName,
    key: name,
    version: {
      major: major,
      minor: minor,
      patch: patch,
    },
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

export function zipBundle() {
  const appManifestPath = resolve('./dist/app-manifest.json');
  const bundlePath = resolve('./dist/app-bundle.js');

  var zip = new AdmZip();

  //TODO: scan files in package.json
  zip.addLocalFile(appManifestPath);
  zip.addLocalFile(bundlePath);

  zip.writeZip('./dist/bundle.zip');
  return zip;
}
