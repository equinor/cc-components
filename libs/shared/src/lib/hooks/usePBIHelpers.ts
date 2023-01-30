import { useServiceDiscovery } from './useServiceDiscovery';
type EmbedInfo = {
  type: number;
  embedConfig: {
    name: string | null;
  };
};
type EmbedToken = {
  expirationUtc: string;
  token: string | null;
};

const isEmbedInfo = (embedInfo: unknown): embedInfo is EmbedInfo => {
  return (embedInfo as EmbedInfo).embedConfig.name !== undefined ? true : false;
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

  const getEmbed = async (reportUri: string) => {
    const client = await serviceDisco.createClient('reports');
    const res = await client.fetch(`${client.uri}/reports/${reportUri}/config/embedinfo`);

    const embedInfo = await res.json();

    if (isEmbedInfo(embedInfo)) return embedInfo.embedConfig;
    else {
      throw new Error("Couldn't retrieve embedConfig for current report");
    }
  };

  const getToken = async (reportUri: string) => {
    const client = await serviceDisco.createClient('reports');
    const res = await client.fetch(`${client.uri}/reports/${reportUri}/token`);
    const jsonRes = await res.json();
    if (isEmbedToken(jsonRes)) return jsonRes;
    else {
      throw new Error("Couldn't retrieve embedToken for current report");
    }
  };

  return {
    getEmbed,
    getToken,
  };
};
