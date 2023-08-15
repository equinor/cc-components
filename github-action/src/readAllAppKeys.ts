import { readFileSync, readdirSync, existsSync } from 'fs';
import { resolve } from 'path';
import { chdir } from 'process';
import { PackageJson } from './utils/parsePackageJson.js';

/**
 * Function for reading all app keys from this monorepo
 * This will be useful for fdev admins patching
 */
export function readAllAppKeys() {
  const rootDir = resolve(import.meta.url.replace('file:///', ''), '../../../');
  const appKeys: AppInfo[] = [
    ...traverseAppsDirectory('apps', rootDir),
    ...traverseAppsDirectory('reports', rootDir),
  ];
  chdir(rootDir);
  return appKeys;
}

export type AppInfo = {
  key: string;
  displayName: string;
  prodSkip: boolean;
  skipReason: string | null;
  readme: string;
};

function traverseAppsDirectory(folderName = 'apps', rootDir: string) {
  const keys: AppInfo[] = [];
  const appsFolder = readdirSync(`${rootDir}/${folderName}`);
  appsFolder
    //Exclude hidden files, .gitkeep etc...
    .filter((s) => !s.includes('.'))
    .forEach((s) => {
      try {
        const file = readFileSync(`${rootDir}/${folderName}/${s}/package.json`);
        const content: PackageJson = JSON.parse(file.toString('utf-8'));
        if (!content.name) {
          throw new Error(`No name property in package json of ${s}`);
        }
        if (content.name.startsWith('@')) {
          console.warn(`Skipping ${content.name}, @ not allowed`);
          return;
        }
        const prodSkipInfo = checkProdSkip(rootDir, folderName, s);
        keys.push({
          key: content.name,
          displayName: content?.displayName ?? content.name,
          prodSkip: prodSkipInfo.prodSkip,
          skipReason: prodSkipInfo.reason ?? '',
          readme: `https://github.com/equinor/cc-components/blob/main/${folderName}/${s}/README.md`,
        });
      } catch (e) {
        const possibleSubDirFolder = `${rootDir}/${folderName}/${s}`;
        if (!isSubDir(possibleSubDirFolder)) {
          console.log(`${s} did not contain a package.json`);
          return;
        }
        keys.push(...traverseAppsDirectory(`${folderName}/${s}`, rootDir));
      }
    });
  return keys;
}

function checkProdSkip(
  rootDir: string,
  folderName: string,
  app: string
): { prodSkip: boolean; reason: string | null } {
  const prodSkipPath = `${rootDir}/${folderName}/${app}/prod.skip`;
  const prodSkipExists = existsSync(prodSkipPath);
  if (!prodSkipExists) {
    return { prodSkip: false, reason: null };
  }
  const reason = readFileSync(prodSkipPath);
  return { prodSkip: true, reason: reason.toString('utf-8') };
}

function isSubDir(dir: string) {
  const subDir = readdirSync(dir).filter((s) => !s.includes('.'));
  const file = readFileSync(`${dir}/${subDir[0]}/package.json`);
  return !!file;
}

readAllAppKeys();
