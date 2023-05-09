import { writeFileSync } from 'fs';
import { fetch } from 'cross-fetch';

export async function downloadCIBundle(appKey: string) {
  const res = await fetch(
    `https://backend-fusion-project-portal-test.radix.equinor.com/api/bundles/${appKey}`
  );
  if (!res.ok) {
    throw new ApiError('Failed to fetch bundle', res);
  }
  const content = await res.text();
  writeFileSync('./app-bundle.js', content);
}

class ApiError extends Error {
  public cause: Response;

  constructor(reason: string, cause: Response) {
    super(reason);
    this.cause = cause;
  }
}
