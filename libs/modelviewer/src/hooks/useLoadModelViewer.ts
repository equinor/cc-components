import { useAccessToken } from '@equinor/fusion-framework-react-app/msal';
import { useHttpClient } from '@equinor/fusion-framework-react-app/http';

import { useQuery } from '@tanstack/react-query';
import { setupEcho3dWeb } from '@equinor/echo-3d-viewer';
import { tokens } from '@equinor/eds-tokens';

import { useMemo, useRef } from 'react';
import { useEnvConfig } from '../providers/envConfigProvider';
import { AccessError } from '../types/errors';

export const useLoadModelViewer = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const echoClient = useHttpClient('echo');

  const env = useEnvConfig();

  const modelRequest = useMemo(
    () => ({
      scopes: [env.modelClientScope],
      prompt: 'login',
      onRedirectNavigate: () => false,
    }),
    [env]
  );

  const hierarchyRequest = useMemo(
    () => ({
      scopes: [env.hierarchyClientScope],
      prompt: 'login',
      onRedirectNavigate: () => false,
    }),
    [env]
  );

  const { token: modelToken, error: modelError } = useAccessToken(modelRequest);

  const { token: hierarchyToken, error: hierarchyError } =
    useAccessToken(hierarchyRequest);

  if (modelError) {
    throw new AccessError('Model distribution token request failed', {
      cause: modelError,
    });
  }

  if (hierarchyError) {
    throw new AccessError('Hierarchy token request failed', {
      cause: hierarchyError,
    });
  }

  const { isPending, data: echoInstance } = useQuery({
    queryKey: ['model-viewer-loader'],
    queryFn: async () => {
      if (!modelToken || !hierarchyToken || !canvasRef.current) {
        throw new Error('Tokens and ViewRef should be set');
      }

      const echoInstance = await setupEcho3dWeb(
        canvasRef.current,
        {
          baseUrl: env.modelClientBaseUrl,
          getAccessToken: async () => modelToken ?? '',
        },
        {
          baseUrl: env.hierarchyClientBaseUrl,
          getAccessToken: async () => hierarchyToken ?? '',
        },
        {
          clearColor: tokens.colors.ui.background__info.hex,
        }
      );

      await echoInstance.client.authenticate();

      return echoInstance;
    },
    refetchOnWindowFocus: false,
    gcTime: 0,
    enabled: !!modelToken && !!hierarchyToken && !!canvasRef.current,
  });

  return {
    canvasRef,
    echoClient,
    echoInstance,
    isPending,
  };
};
