import ora from 'ora';
import { resolve } from 'path';
import AdmZip from 'adm-zip';

export function zipBundle() {
  const spinner = ora().start('Zipping bundle');

  const appManifestPath = resolve('./dist/app-manifest.json');
  const bundlePath = resolve('./dist/app-bundle.js');

  var zip = new AdmZip();

  //TODO: scan files in package.json
  zip.addLocalFile(appManifestPath);
  zip.addLocalFile(bundlePath);

  zip.writeZip('./dist/bundle.zip');

  spinner.succeed('Bundle zipped');
}
