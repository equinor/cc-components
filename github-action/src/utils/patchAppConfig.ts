import { HttpClient } from '@actions/http-client';
import { OutgoingHttpHeaders } from 'http';
import { logInfo } from './logInfo.js';

export async function getAppConfig(token: string, appKey: string, url: string) {
  const client = new HttpClient();

  const headers: OutgoingHttpHeaders = {
    ['Authorization']: `Bearer ${token}`,
    ['Content-Type']: 'application/json',
  };

  const res = await client.get(`${url}/api/apps/${appKey}/config`, headers);
  if (res.message.statusCode !== 200) {
    logInfo(`Failed to fetch client config, Code: ${res.message.statusCode}`, 'Red');
    throw new Error('Failed to fetch client config');
  }
  return JSON.parse(await res.readBody());
}

type AppConfig = {
  commit: string;
  ai: string;
};

export async function patchAppConfig<T extends Record<PropertyKey, unknown> = {}>(
  config: AppConfig & T,
  token: string,
  appKey: string,
  url: string
) {
  const client = new HttpClient();

  const headers: OutgoingHttpHeaders = {
    ['Authorization']: `Bearer ${token}`,
    ['Content-Type']: 'application/json',
  };
  const existingConfig = await getAppConfig(token, appKey, url);

  existingConfig.environment = { ...existingConfig.environment, ...config };

  //patch
  const patchResponse = await client.put(
    `${url}/api/apps/${appKey}/config`,
    JSON.stringify(existingConfig),
    headers
  );
  if (patchResponse.message.statusCode !== 200) {
    logInfo(
      `Failed to patch client config, Code: ${patchResponse.message.statusCode}`,
      'Red'
    );
    throw new Error(`Failed to patch client config, ${await patchResponse.readBody()}`);
  }
  logInfo(`Sucessfully patched client config for ${appKey}`, 'Green');
}
