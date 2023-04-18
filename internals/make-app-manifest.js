import fs from 'fs';
import { parsePackageJson } from './utils/parsePackageJson';

function makeManifest() {
  const { version, name } = parsePackageJson('./package.json');
  const { major, minor, patch } = splitVersions(version);

  const manifest = {
    name: name[0].toUpperCase() + name.slice(1),
    shortName: name,
    key: name,
    version: {
      major: major,
      minor: minor,
      patch: patch,
    },
  };

  const data = JSON.stringify(manifest, null, 2);

  fs.writeFile('./dist/app-manifest.json', data, (err) => {
    if (err) {
      throw err;
    }
    console.log(
      `App manifest for ${name}@${major}.${minor}.${patch} successfully created`
    );
  });
}

function splitVersions(version) {
  const [major, minor, patch] = version.split('.');
  return {
    major,
    minor,
    patch,
  };
}

makeManifest();
