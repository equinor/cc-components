import { useAppModules } from '@equinor/fusion-framework-react-app';
import { useRef } from 'react';

import { ModuleViewer } from '../modules';

import { useQuery } from '@tanstack/react-query';

export const useLoadModelViewer = () => {
  const viewerRef = useRef<HTMLCanvasElement>(null);
  const viewerInstance = useAppModules<[ModuleViewer]>().moduleViewer;

  const { isLoading } = useQuery({
    queryKey: ['model-viewer-loader', viewerRef.current?.id],
    queryFn: async () => {
      if (!viewerRef.current) return;

      await viewerInstance.setup({ canvas: viewerRef.current });
      await viewerInstance.client?.authenticate();
      return viewerInstance;
    },
    refetchOnWindowFocus: false,
  });

  return {
    viewerRef,
    viewerInstance,
    isLoading,
  };
};
