import { resolve } from 'path';
import AdmZip from 'adm-zip';
import { notice } from '@actions/core';

export function zipBundle() {
  // zip bundle
  notice('zipping bundle');
  const appManifestPath = resolve('./dist/app-manifest.json');
  const bundlePath = resolve('./dist/app-bundle.js');

  var zip = new AdmZip();

  //TODO: scan files in package.json
  zip.addLocalFile(appManifestPath);
  zip.addLocalFile(bundlePath);

  zip.writeZip('./dist/bundle.zip');
  return zip;
}
