import { readFileSync, writeFileSync } from 'fs';
import { parsePackageJson } from './parsePackageJson.js';
import { FusionEnvironment } from './deployApp.js';
import { execSync } from 'child_process';

export async function writeTraceFileAsync(env: FusionEnvironment) {
  let r: string = '';
  try {
    r = readFileSync('./versions.md', 'utf-8');
  } catch (e) {}

  const { version } = parsePackageJson();
  if (!version) throw new Error('Missing version in package.json');

  switch (env) {
    case 'ci':
      const lines = r.split('\n');
      const prodVersion =
        lines
          .find((s) => s.includes('FPRD:'))
          ?.split(':')[1]
          .trim() ?? null;

      writeFileSync('./versions.md', generateStack(version, prodVersion ?? null));
      break;

    case 'fprd': {
      const lines = r.split('\n');
      const civersion =
        lines
          .find((s) => s.includes('CI:'))
          ?.split(':')[1]
          .trim() ?? null;

      writeFileSync('./versions.md', generateStack(civersion, civersion));
      break;
    }
  }
}

function generateStack(ci: string | null, fprd: string | null) {
  return `
CI: ${ci}
FPRD: ${fprd}
`;
}
