import { useQuery } from '@tanstack/react-query';
import { PropsWithChildren, createContext, useContext } from 'react';
import { ModelViewerEnvConfig } from '../types/modelViewerEnvConfig';
import { useCurrentApp } from '@equinor/fusion-framework-react/app';
import { Loading } from '../components/loading/loading';

export type EnvConfigContextType = {
  hierarchyClientBaseUrl: string;
  hierarchyClientScope: string;
  modelClientBaseUrl: string;
  modelClientScope: string;
};

const EnvConfigContext = createContext({} as EnvConfigContextType);

export const useEnvConfig = () => useContext(EnvConfigContext);

export const EnvConfigContextProvider = ({ children }: PropsWithChildren<{}>) => {
  const app = useCurrentApp();

  const { data: config, error } = useQuery({
    queryKey: ['modelviewer-app-config'],
    queryFn: async () => {
      const config = await app.currentApp?.getConfigAsync();

      if (!config) throw new Error('Failed to fetch app config');

      return config.environment as ModelViewerEnvConfig;
    },
  });

  if (!config) {
    return <Loading />;
  }

  if (error || !config) {
    throw new Error('ModelViewer configuration is missing', { cause: error });
  }

  return (
    <EnvConfigContext.Provider value={config.modelViewerConfig}>
      {children}
    </EnvConfigContext.Provider>
  );
};
