import { PropsWithChildren, createContext, useContext } from 'react';
import { useFrameworkHttpClient } from '@equinor/fusion-framework-react/http';
type IHttpClient = ReturnType<typeof useFrameworkHttpClient>;

/**
 * Facade for fusion framework http client
 * The goal is to have one http client for an entire app
 */
export const ClientProvider = ({
  client,
  children,
}: PropsWithChildren<{ client: IHttpClient | null }>) => {
  return <ClientContext.Provider value={client}>{children}</ClientContext.Provider>;
};

const ClientContext = createContext<null | IHttpClient>(null);

/**
 * Returns the main api client configured in framework config
 */
export const useHttpClient = () => {
  const client = useContext(ClientContext);
  if (!client) throw new Error('No client provided');
  return client;
};
