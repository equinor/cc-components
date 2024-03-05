import { useModelSelectionContext, useModelViewerContext } from '../providers';
import { useQuery } from '@tanstack/react-query';

export const useModelLoader = () => {
  const { echoInstance } = useModelViewerContext();
  const { modelMeta } = useModelSelectionContext();

  const { data, isFetching, error } = useQuery({
    queryKey: ['echo-viewer', modelMeta?.id],
    queryFn: async () => {
      if (!modelMeta) throw Error('No model meta');
      const model = await echoInstance.viewer.loadModel(modelMeta);

      return {
        viewer: echoInstance.viewer,
        hierarchyClient: echoInstance.hierarchyApiClient,
        modelMeta,
        model,
      };
    },
    enabled: Boolean(modelMeta),
    refetchOnWindowFocus: false,
  });

  return { data, isFetching, error };
};
