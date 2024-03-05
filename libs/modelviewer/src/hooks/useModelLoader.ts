import { useModelSelectionContext, useModelViewerContext } from '../providers';
import { useQuery } from '@tanstack/react-query';
import { Color } from 'three';

export const useModelLoader = () => {
  const { echoInstance } = useModelViewerContext();
  const { modelMeta } = useModelSelectionContext();

  const { data, isFetching, error } = useQuery({
    queryKey: ['echo-viewer', modelMeta?.id],
    queryFn: async () => {
      if (!modelMeta) throw Error('No model meta');

      const { viewer } = echoInstance;

      const model = await viewer.loadModel(modelMeta, true);

      const cameraConfiguration = model.getCameraConfiguration();
      const position = cameraConfiguration?.position;
      const target = cameraConfiguration?.target;

      if (!position || !target) {
        viewer.initializeFirstPersonControlsUsingModelAsBoundingBox(model);
      } else {
        viewer.initializeFirstPersonControlsUsingTarget(position, target);
      }

      model.setDefaultNodeAppearance({ color: new Color('#e3e3e3') });

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
