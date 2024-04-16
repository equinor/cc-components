import { PropsWithChildren, createContext, useContext, useEffect } from 'react';
import { EchoSetupObject } from '@equinor/echo-3d-viewer';
import styled from 'styled-components';

import { useLoadModelViewer } from '../hooks/useLoadModelViewer';
import Canvas from '../components/canvas/canvas';
import { IHttpClient } from '@equinor/fusion-framework-module-http';

type ModelViewerContextType = {
  echoInstance: EchoSetupObject;
  echoClient: IHttpClient;
};

const ModelViewerContext = createContext<ModelViewerContextType>(
  {} as ModelViewerContextType
);

export const useModelViewerContext = () => useContext(ModelViewerContext);

export const ModelViewerProvider = ({ children }: PropsWithChildren) => {
  const { canvasRef, echoClient, echoInstance, isLoading } = useLoadModelViewer();

  /* Add event listeners for re-authenticating every timewindow gains focus.
   * This is needed since Reveal does not check if it should re-authenticate BEFORE sending the requests for downloading sector 3D files.
   */
  useEffect(() => {
    const onFocusGained = () => {
      const authenticateEchoClient = async () => {
        await echoInstance?.client?.authenticate();
      };

      authenticateEchoClient();
    };

    if (echoInstance?.client) {
      window.addEventListener('focus', onFocusGained);
    }

    return () => {
      window.removeEventListener('focus', onFocusGained);
    };
  }, [echoInstance?.client]);

  return (
    <ModelViewerContext.Provider
      value={{
        echoInstance: echoInstance as EchoSetupObject,
        echoClient,
      }}
    >
      <Container>
        <Canvas viewerRef={canvasRef} />
        {isLoading ? null : children}
      </Container>
    </ModelViewerContext.Provider>
  );
};

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;
