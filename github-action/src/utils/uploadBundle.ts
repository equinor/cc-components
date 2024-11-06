import AdmZip from 'adm-zip';

import { HttpClient } from '@actions/http-client';
import { OutgoingHttpHeaders } from 'http';
import { Readable } from 'stream';
import { notice } from '@actions/core';
import { logInfo } from './logInfo.js';

export async function uploadBundle(
  baseUrl: string,
  token: string,
  appKey: string,
  zipped: AdmZip,
  version: string
) {
  const client = new HttpClient();

  const headers: OutgoingHttpHeaders = {
    ['Authorization']: `Bearer ${token}`,
    ['Content-Type']: 'application/zip',
    ['Content-Disposition']: 'attachment; filename=bundle.zip',
  };

  const stream = Readable.from(zipped.toBuffer());
  logInfo(`Sending payload to ${baseUrl}/bundles/apps/${appKey}`, "Green");
  const r = await client.sendStream(
    'POST',
    `${baseUrl}/bundles/apps/${appKey}`,
    stream,
    headers
  );

  notice(`${appKey} bundle uploaded with status code ${r.message.statusCode}`);
  if (r.message.statusCode !== 201) {
    const body = await r.readBody()
    logInfo(`Failed to upload ${appKey}, code: ${r.message.statusCode}`, 'Red');
    logInfo(body, 'Red');
    throw new Error('Bundle failed to upload, fatal error');
  }

  /** Publish bundle */
  const publishResponse = await client.put(
    `${baseUrl}/apps/${appKey}/tags/latest`,
    JSON.stringify({ version: version }),
    {
      ['Authorization']: `Bearer ${token}`,
      ["Content-Type"]: 'application/json',
    }
  );

  if (publishResponse.message.statusCode !== 200) {
    logInfo(`Failed to publish ${appKey}, code: ${publishResponse.message.statusCode}`, 'Red');
    const body = await publishResponse.readBody()
    throw new Error(body)
  }
  logInfo(`Sucessfully published ${appKey}`, 'Green');
}
