import { useRef } from 'react';

import { useAccessToken } from '@equinor/fusion-framework-react-app/msal';

import { useQuery } from '@tanstack/react-query';
import { setupEcho3dWeb } from '@equinor/echo-3d-viewer';
import { tokens } from '@equinor/eds-tokens';

export const useLoadModelViewer = () => {
  const viewerRef = useRef<HTMLCanvasElement>(null);

  const a = useAccessToken({});

  const { isLoading, data } = useQuery({
    queryKey: ['model-viewer-loader', viewerRef.current?.id],
    queryFn: async () => {
      if (!viewerRef.current) return;

      const echoInstance = await setupEcho3dWeb(
        viewerRef.current,
        {
          baseUrl: 'https://app-echomodeldist-dev.azurewebsites.net',
          getAccessToken: async () => 'some-token',
        },
        {
          baseUrl: 'https://app-echo-hierarchy-dev.azurewebsites.net',
          getAccessToken: async () => 'some-token',
        },
        {
          clearColor: tokens.colors.ui.background__info.hex,
        }
      );

      console.log({ echoInstance });

      await echoInstance.client.authenticate();

      return echoInstance;
    },
    refetchOnWindowFocus: false,
  });

  return {
    viewerRef,
    viewerInstance: data, // TODO: REMOVE THIS
    client: data?.client,
    viewer: data?.viewer,
    modelApiClient: data?.modelApiClient,
    hierarchyApiClient: data?.hierarchyApiClient,
    isLoading,
  };
};
