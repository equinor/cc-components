import { useAccessToken } from '@equinor/fusion-framework-react-app/msal';
import { useHttpClient } from '@equinor/fusion-framework-react-app/http';

import { useQuery } from '@tanstack/react-query';
import { setupEcho3dWeb } from '@equinor/echo-3d-viewer';
import { tokens } from '@equinor/eds-tokens';
import { useRef } from 'react';

const tokenRequestA = {
  scopes: ['d484c551-acf8-45bc-b1e8-3f4373bd0d42/user_impersonation'], // TODO: Get from env
};

const tokenRequestB = {
  scopes: ['ebc04930-bf9c-43e5-98bc-bc90865600b8/user_impersonation'], // TODO: Get from env
};

export const useLoadModelViewer = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const echoClient = useHttpClient('echo');

  const { token: tokenA, error: tokenErrorA } = useAccessToken(tokenRequestA);

  const { token: tokenB, error: tokenErrorB } = useAccessToken(tokenRequestB);

  if (tokenErrorA) throw new Error('Token failed', { cause: tokenErrorA });
  if (tokenErrorB) throw new Error('Token failed', { cause: tokenErrorB });

  const { isLoading, data } = useQuery({
    queryKey: ['model-viewer-loader'],
    queryFn: async () => {
      if (!tokenA || !tokenB || !canvasRef.current) {
        throw new Error('Tokens and ViewRef should be set');
      }

      const echoInstance = await setupEcho3dWeb(
        canvasRef.current,
        {
          baseUrl: 'https://app-echomodeldist-dev.azurewebsites.net', // TODO: Get from env
          getAccessToken: async () => tokenA ?? '',
        },
        {
          baseUrl: 'https://app-echo-hierarchy-dev.azurewebsites.net', // TODO: Get from env
          getAccessToken: async () => tokenB ?? '',
        },
        {
          clearColor: tokens.colors.ui.background__info.hex,
        }
      );

      await echoInstance.client.authenticate();

      return echoInstance;
    },
    refetchOnWindowFocus: false,
    enabled: !!tokenA && !!tokenB && !!canvasRef.current,
  });

  return {
    canvasRef,
    echoClient,
    echoInstance: data,
    isLoading: isLoading,
  };
};
