import fs from 'fs';

function makeManifest() {
  const blob = fs.readFileSync('./package.json');
  const { version, name } = JSON.parse(blob.toString('utf8'));
  const [major, minor, patch] = version.split('.');

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

makeManifest();
