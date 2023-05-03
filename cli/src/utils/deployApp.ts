import { execSync } from 'child_process';
import ora from 'ora';
import { parsePackageJson } from './parsePackageJson.js';
import open from 'open';

export type FusionEnvironment = 'fqa' | 'ci' | 'fprd';

export async function deployApp(env: FusionEnvironment) {
  const spinner = ora().start('Uploading bundle to fdev');
  const { name } = parsePackageJson();
  if (!name) throw new Error('Missing name in package.json');
  execSync(`fdev portal upload -e ${env} -k ${name} dist/bundle.zip`);
  spinner.succeed('Bundle uploaded');
  openPage(env);
}

function openPage(env: FusionEnvironment) {
  switch (env) {
    case 'fqa':
      open(url(env));
      break;

    case 'ci':
      open(url(env));
      break;

    case 'fprd':
      open(url(env));
      break;
  }
}

const url = (env: FusionEnvironment) => `https://admin.${env}.fusion-dev.net/apps`;
