import { useAppModules } from '@equinor/fusion-framework-react-app';
import {
  PropsWithChildren,
  RefObject,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { ModuleViewer } from '../modules';

import {
  Echo3dViewer,
  EchoSetupObject,
  HierarchyClient,
  ModelsClient,
} from '@equinor/echo-3d-viewer';
import { Canvas } from '../components/canvas/canvas';
import { IHttpClient } from '@equinor/fusion-framework-module-http';
import { Loading } from '../components/loading/loading';

type ModelViewerContextType = {
  viewer: Echo3dViewer;
  modelApiClient: ModelsClient;
  hierarchyApiClient: HierarchyClient;
  echoInstance: EchoSetupObject;
  echoClient?: IHttpClient;
  viewerRef?: RefObject<HTMLCanvasElement>;
};

const ModelViewerContext = createContext<ModelViewerContextType>(
  {} as ModelViewerContextType
);

export const useModelViewerContext = () => useContext(ModelViewerContext);

export const ModelViewerProvider = ({ children }: PropsWithChildren) => {
  const viewerRef = useRef<HTMLCanvasElement>(null);
  const viewerInstance = useAppModules<[ModuleViewer]>().moduleViewer;

  const [isLoaded, setIsLoaded] = useState(false);

  const init = async () => {
    await viewerInstance.setup({ canvas: viewerRef.current });
    await viewerInstance.client?.authenticate();
    setIsLoaded(true);
  };

  useEffect(() => {
    if (!isLoaded) init();
  }, [viewerInstance, isLoaded, viewerRef.current]);

  /* Add event listeners for re-authenticating every timewindow gains focus.
   * This is needed since Reveal does not check if it should re-authenticate BEFORE sending the requests for downloading sector 3D files.
   */
  useEffect(() => {
    const onFocusGained = () => {
      const authenticateEchoClient = async () => {
        await viewerInstance.client?.authenticate();
      };

      authenticateEchoClient();
    };

    if (viewerInstance.client) {
      window.addEventListener('focus', onFocusGained);
    }

    return () => {
      window.removeEventListener('focus', onFocusGained);
    };
  }, [viewerInstance.client]);

  return (
    <ModelViewerContext.Provider
      value={{
        viewer: viewerInstance.viewer,
        modelApiClient: viewerInstance.modelApiClient,
        hierarchyApiClient: viewerInstance.hierarchyApiClient,
        echoInstance: viewerInstance.echoInstance,
        echoClient: viewerInstance.echoClient,
      }}
    >
      <Canvas viewerRef={viewerRef} />
      {!isLoaded ? <Loading /> : children}
    </ModelViewerContext.Provider>
  );
};

