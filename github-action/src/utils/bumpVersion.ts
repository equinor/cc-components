import { HttpClient } from '@actions/http-client';

// We do not use semver and dont want to manually bump versions.
// For now we ask the server what the latest version is and bump the patch version
export async function getVersion(ciUrl: string, token: string, name: string) {
  const client = new HttpClient();
  const response = await client.get(`${ciUrl}/apps/${name}?api-version=1.0`, {
    ['Authorization']: `Bearer ${token}`,
  });
  const body = await response.readBody();
  const json = JSON.parse(body);
  const v = incrementPatchVersion(json.build.version);
  return v;
}

function incrementPatchVersion(semver: string) {
  const parts = semver.split('.');
  if (parts.length !== 3) {
    throw new Error('Invalid semver format: ' + semver);
  }
  const patch = parseInt(parts[2], 10) + 1;
  return `${parts[0]}.${parts[1]}.${patch}`;
}
