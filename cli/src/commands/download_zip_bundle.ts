import { writeFileSync } from 'fs';
import { fetch } from 'cross-fetch';
import ora from 'ora';

export async function downloadCIBundle(appKey: string) {
  const spinner = ora().start('Downloading bundle from CI');
  const res = await fetch(
    `https://backend-fusion-project-portal-test.radix.equinor.com/api/bundles/${appKey}`
  );
  if (!res.ok) {
    spinner.fail('Failed to download bundle');
    throw new ApiError('Failed to fetch bundle', res);
  }
  spinner.succeed('Downloaded bundle successfully');
  const content = await res.text();
  writeFileSync('./dist/app-bundle.js', content);
}

class ApiError extends Error {
  public cause: Response;

  constructor(reason: string, cause: Response) {
    super(reason);
    this.cause = cause;
  }
}
