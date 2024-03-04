import { CogniteCadModel } from '@cognite/reveal';
import { useModelContext, useModelViewerContext } from '../providers';
import { useQuery } from '@tanstack/react-query';

export const useSelectionService = () => {
  const { echoInstance } = useModelViewerContext();
  const { modelMeta } = useModelContext();

  const { data, isFetching, error } = useQuery<CogniteCadModel>({
    queryKey: ['echo-model', echoInstance, modelMeta],
    queryFn: () => {
      if (!echoInstance || !modelMeta) throw Error('Echo Data was not instantiated');
      return echoInstance.viewer.loadModel(modelMeta);
    },
  });

  return { selectionService };
};
