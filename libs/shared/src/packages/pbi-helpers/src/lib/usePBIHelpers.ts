import { useServiceDiscovery } from '../../../hooks/src/lib/useServiceDiscovery';
import { EmbedInfo, EmbedToken, ReportInfo } from './types';
import { useExternalContextId } from '../../../hooks';
import { type IHttpClient } from '@equinor/fusion-framework-module-http';
import { useContext } from 'react';
import { ContextItem, useCurrentContext, useModuleCurrentContext } from '@equinor/fusion-framework-react-module-context';

const isEmbedInfo = (embedInfo: unknown): embedInfo is EmbedInfo => {
  return (embedInfo as EmbedInfo).embedConfig.embedUrl !== undefined ? true : false;
};
const isEmbedToken = (embedToken: unknown): embedToken is EmbedToken => {
  if (
    (embedToken as EmbedToken).token !== undefined &&
    (embedToken as EmbedToken).expirationUtc !== undefined
  )
    return true;
  else return false;
};

export const usePBIHelpers = () => {
  const serviceDisco = useServiceDiscovery();
  const contextId = useExternalContextId();
  const { currentContext } = useModuleCurrentContext();

  const getEmbed = async (reportUri: string, _token: string, signal?: AbortSignal) => {
    if (!contextId) {
      throw new Error('No context selected');
    }
    const client = await serviceDisco.createClient('reports');

    await checkAccess(client, reportUri, currentContext!);

    const res = await client.fetch(`reports/${reportUri}/config/embedinfo`, { signal });
    if (!res.ok) {
      throw new Error('', { cause: res });
    }
    const embedInfo = await res.json();

    if (isEmbedInfo(embedInfo)) return embedInfo.embedConfig;
    else {
      throw new Error("Couldn't retrieve embedConfig for current report");
    }
  };

  const getToken = async (reportUri: string, signal?: AbortSignal) => {
    const client = await serviceDisco.createClient('reports');
    const res = await client.fetch(`reports/${reportUri}/token`, {
      signal,
    });
    if (!res.ok) {
      throw new Error('', { cause: res });
    }
    const jsonRes = await res.json();
    if (isEmbedToken(jsonRes)) return jsonRes;
    else {
      throw new Error("Couldn't retrieve embedToken for current report");
    }
  };

  const getErrorMessage = async (reportUri: string, signal?: AbortSignal) => {
    const client = await serviceDisco.createClient('reports');
    const res = await client.fetch(`reports/${reportUri}/rlsrequirements`, { signal });
    return res.text();
  };

  const getReportInfo = async (
    reportUri: string,
    signal?: AbortSignal
  ): Promise<ReportInfo> => {
    const client = await serviceDisco.createClient('reports');
    const res = await client.fetch(`reports/${reportUri}`, { signal });
    return res.json();
  };

  return {
    getEmbed,
    getToken,
    getErrorMessage,
    getReportInfo,
  };
};

async function checkAccess(client: IHttpClient, reportUri: string, ctx: ContextItem) {

  const res = await client.fetch(
    `reports/${reportUri}/contexts/${ctx.externalId}/contexttypes/${ctx.type.id!}/checkaccess`,
    { method: 'OPTIONS' }
  );

  if (res.status === 403) {
    throw res;
  }
}
