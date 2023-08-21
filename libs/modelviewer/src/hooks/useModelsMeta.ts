import { AssetMetadataSimpleDto } from '@equinor/echo-3d-viewer';
import { useAppModules } from '@equinor/fusion-framework-react-app';
import { useEffect, useState } from 'react';
import { ModuleViewer } from '../modules';

export const useModelsMeta = () => {
  const [models, setModels] = useState<AssetMetadataSimpleDto[]>([]);
  const moduleViewer = useAppModules<[ModuleViewer]>().moduleViewer;
  useEffect(() => {
    moduleViewer.modelsService?.currentModels$.subscribe((models) => setModels(models));
  }, [moduleViewer.modelsService]);
  return models;
};
