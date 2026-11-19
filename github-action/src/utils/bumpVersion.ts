import { HttpClient } from '@actions/http-client';

// We do not use semver and dont want to manually bump versions.
// For now we ask the server for the highest uploaded version and bump the patch version.
// The "latest" tag can point to an older build (e.g. after a rollback), so it is not used here.
export async function getVersion(ciUrl: string, token: string, name: string) {
  const client = new HttpClient();
  try {
    const response = await client.get(`${ciUrl}/apps/${name}/builds?api-version=1.0`, {
      ['Authorization']: `Bearer ${token}`,
    });
    const body = await response.readBody();
    const json: { value: { version: string }[] } = JSON.parse(body);
    const highest = json.value.map((b) => b.version).reduce(maxVersion);
    return incrementPatchVersion(highest);

  } catch (error) {
    console.warn("Failed to get version from server", error);
    console.info("Falling back to 0.0.1");
    return "0.0.1";
  }
}

function maxVersion(a: string, b: string) {
  const pa = a.split('.').map(Number);
  const pb = b.split('.').map(Number);
  for (let i = 0; i < 3; i++) {
    if (pa[i] !== pb[i]) return pa[i] > pb[i] ? a : b;
  }
  return a;
}

function incrementPatchVersion(semver: string) {
  const parts = semver.split('.');
  if (parts.length !== 3) {
    throw new Error('Invalid semver format: ' + semver);
  }
  const patch = parseInt(parts[2], 10) + 1;
  return `${parts[0]}.${parts[1]}.${patch}`;
}
