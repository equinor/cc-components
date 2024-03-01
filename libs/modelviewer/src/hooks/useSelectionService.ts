import { CogniteCadModel } from '@cognite/reveal';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { SelectionService } from '../services';
import { useModelContext, useModelViewerContext } from '../providers';

export const useSelectionService = () => {
  const { echoInstance } = useModelViewerContext();
  const { modelMeta } = useModelContext();

  const [model, setModel] = useState<CogniteCadModel>();

  const viewer = useMemo(() => echoInstance?.viewer, [echoInstance]);

  const hierarchyClient = useMemo(() => echoInstance?.hierarchyApiClient, [echoInstance]);

  const selectionService = useMemo(() => {
    if (model && hierarchyClient && modelMeta && viewer)
      return new SelectionService(modelMeta, hierarchyClient, viewer, model);
  }, [modelMeta, hierarchyClient, viewer, model]);

  const loadModel = useCallback(async () => {
    if (!viewer || !modelMeta) return;
    const loadedModel = await viewer.loadModel(modelMeta);
    setModel(loadedModel);
  }, [viewer, modelMeta]);

  useEffect(() => {
    loadModel();
  }, [loadModel]);

  return { selectionService };
};
