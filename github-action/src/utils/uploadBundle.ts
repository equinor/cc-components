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
  zipped: AdmZip
) {
  const client = new HttpClient();

  // await ensureAppExists(baseUrl, token, appKey);

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

  notice(`bundle uploaded with status code ${r.message.statusCode}`);
  if (r.message.statusCode !== 201) {
    const body = await r.readBody()
    logInfo(`Failed to upload ${appKey}, code: ${r.message.statusCode}`, 'Red');
    logInfo(body, 'Red');
    // logInfo(`Failed to upload ${appKey}, code: ${r.message.statusCode}`, 'Red');
    // throw new Error('Bundle failed to upload, fatal error');
  }

  /** Publish bundle */
  const publishResponse = await client.post(
    `${baseUrl}/apps/${appKey}/tags/latest`,
    '',
    headers
  );
  if (publishResponse.message.statusCode !== 201) {
    logInfo(`Failed to publish ${appKey}, code: ${r.message.statusCode}`, 'Red');
    const body = await publishResponse.readBody()
    throw new Error(body)
  }
  logInfo(`Sucessfully published ${appKey}`, 'Green');
}

async function ensureAppExists(baseUrl: string, token: string, appKey: string) {
  const client = new HttpClient();

  const headers: OutgoingHttpHeaders = {
    ['Authorization']: `Bearer ${token}`,
    ['Content-Type']: 'application/zip',
  };

  const res = await client.get(
    `${baseUrl}/api/admin/apps/${appKey}/versions?api-version=1.0`,
    headers
  );

  if (res.message.statusCode === 404) {
    logInfo(`Unknown app: ${appKey}`, 'Red');
    throw new Error(
      'App doesnt exist please use the manual create fusion app to create this app first'
    );
  }
}
