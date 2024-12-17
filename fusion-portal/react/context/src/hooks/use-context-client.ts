import { useEffect, useState } from 'react';

import {
  ClientMethodType,
  ServicesModule,
} from '@equinor/fusion-framework-module-services';
import { ContextApiClient } from '@equinor/fusion-framework-module-services/context';
import { useFramework } from '@equinor/fusion-framework-react-app/framework';

export const useContextClient = <T extends ClientMethodType>(
  type: T
): ContextApiClient<T> | null => {
  const [client, setClient] = useState<ContextApiClient<T> | null>(null);

  const { modules } = useFramework<[ServicesModule]>();

  useEffect(() => {
    modules.services.createContextClient(type).then(setClient);
  }, [modules.services, setClient, type]);

  return client;
};
