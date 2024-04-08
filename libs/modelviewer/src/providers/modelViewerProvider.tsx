import {
  PropsWithChildren,
  RefObject,
  createContext,
  useContext,
  useEffect,
} from 'react';

import {
  Echo3dClient,
  Echo3dViewer,
  EchoSetupObject,
  HierarchyClient,
  ModelsClient,
} from '@equinor/echo-3d-viewer';
import { Canvas } from '../components/canvas/canvas';
import { IHttpClient } from '@equinor/fusion-framework-module-http';
import { useLoadModelViewer } from '../hooks/useLoadModelViewer';
import styled from 'styled-components';

type ModelViewerContextType = {
  viewer: Echo3dViewer;
  modelApiClient: ModelsClient;
  hierarchyApiClient: HierarchyClient;
  echoInstance: EchoSetupObject;
  echoClient?: Echo3dClient;
  viewerRef?: RefObject<HTMLCanvasElement>;
};

const ModelViewerContext = createContext<ModelViewerContextType>(
  {} as ModelViewerContextType
);

export const useModelViewerContext = () => useContext(ModelViewerContext);

export const ModelViewerProvider = ({ children }: PropsWithChildren) => {
  const {
    viewer,
    viewerInstance,
    modelApiClient,
    hierarchyApiClient,
    client,
    viewerRef,
    isLoading,
  } = useLoadModelViewer();

  /* Add event listeners for re-authenticating every timewindow gains focus.
   * This is needed since Reveal does not check if it should re-authenticate BEFORE sending the requests for downloading sector 3D files.
   */
  useEffect(() => {
    const onFocusGained = () => {
      const authenticateEchoClient = async () => {
        await client?.authenticate();
      };

      authenticateEchoClient();
    };

    if (client) {
      window.addEventListener('focus', onFocusGained);
    }

    return () => {
      window.removeEventListener('focus', onFocusGained);
    };
  }, [client]);

  return (
    <ModelViewerContext.Provider
      value={{
        viewer: viewer as Echo3dViewer,
        modelApiClient: modelApiClient as ModelsClient,
        hierarchyApiClient: hierarchyApiClient as HierarchyClient,
        echoInstance: viewerInstance as EchoSetupObject,
        echoClient: client as Echo3dClient,
      }}
    >
      <Container>
        <Canvas viewerRef={viewerRef} />
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