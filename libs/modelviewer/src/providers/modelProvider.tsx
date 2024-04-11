import { PropsWithChildren, createContext, useContext } from 'react';

import {
  AssetMetadataSimpleDto,
  Echo3dViewer,
  HierarchyClient,
} from '@equinor/echo-3d-viewer';

import { useModelLoader } from '../hooks/useModelLoader';
import { CogniteCadModel } from '@cognite/reveal';
import { Loading } from '../components/loading/loading';

interface ModelContextState {
  viewer: Echo3dViewer;
  hierarchyClient: HierarchyClient;
  modelMeta: AssetMetadataSimpleDto;
  model: CogniteCadModel;
}

const ModelContext = createContext({} as ModelContextState);

export const useModelContext = () => useContext(ModelContext);

export const ModelProvider = (props: PropsWithChildren) => {
  const { data, isFetching } = useModelLoader();

  if (isFetching || !data) {
    return <Loading />;
  }

  return <ModelContext.Provider value={data}>{props.children}</ModelContext.Provider>;
};
