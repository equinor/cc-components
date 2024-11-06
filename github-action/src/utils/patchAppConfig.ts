import { HttpClient } from '@actions/http-client';
import { OutgoingHttpHeaders } from 'http';
import { logInfo } from './logInfo.js';

export async function getAppConfig(token: string, appKey: string, url: string) {
  const client = new HttpClient();

  const headers: OutgoingHttpHeaders = {
    ['Authorization']: `Bearer ${token}`,
    ['Content-Type']: 'application/json',
  };

  const res = await client.get(`${url}/apps/${appKey}/builds/latest/config`, headers);
  if (res.message.statusCode !== 200) {
    logInfo(`Failed to fetch client config, Code: ${res.message.statusCode}`, 'Red');
    throw new Error('Failed to fetch client config');
  }
  return JSON.parse(await res.readBody());
}

type AppConfig = {
  commit: string;
  ai: string;
  modelViewerConfig: {
    hierarchyClientBaseUrl: string;
    hierarchyClientScope: string;
    modelClientBaseUrl: string;
    modelClientScope: string;
    echoClientBaseUrl: string;
    echoClientScope: string;
  };
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
    `${url}/apps/${appKey}/builds/latest/config`,
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
