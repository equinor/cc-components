import { useAppModules } from '@equinor/fusion-framework-react-app';
import {
  PropsWithChildren,
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
import Canvas from '../components/canvas/canvas';
import { IHttpClient } from '@equinor/fusion-framework-module-http';

type ModelViewerContextType = {
  viewer?: Echo3dViewer;
  modelApiClient?: ModelsClient;
  hierarchyApiClient?: HierarchyClient;
  echoInstance?: EchoSetupObject;
  viewerRef?: React.RefObject<HTMLCanvasElement>;
  echoClient?: IHttpClient;
};

const modelViewerContext = createContext<ModelViewerContextType>({});

export const ModelViewerContextProvider = ({ children }: PropsWithChildren) => {
  const viewerRef = useRef<HTMLCanvasElement>(null);
  const viewerInstance = useAppModules<[ModuleViewer]>().moduleViewer;

  const [isSetup, setIsSetup] = useState(false);

  useEffect(() => {
    (async () => {
      if (!viewerRef.current || isSetup) return;
      await viewerInstance.setup({ canvas: viewerRef.current }).finally(() => {
        setIsSetup(true);
      });
    })();
  }, [viewerInstance]);

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

  const { viewer, modelApiClient, hierarchyApiClient, echoInstance } = viewerInstance;

  return (
    <modelViewerContext.Provider
      value={{
        viewer,
        modelApiClient,
        hierarchyApiClient,
        echoInstance,
        viewerRef,
        echoClient: viewerInstance.echoClient,
      }}
    >
      <Canvas />
      {children}
    </modelViewerContext.Provider>
  );
};

export const useModelViewerContext = () => {
  const context = useContext(modelViewerContext);
  if (!context) throw new Error('Context provider not found!');
  return context;
};
