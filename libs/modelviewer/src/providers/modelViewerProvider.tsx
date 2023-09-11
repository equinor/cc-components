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
import Canvas from '../components/actions-bar/canvas/canvas';

type ModelViewerContextType = {
  viewer?: Echo3dViewer;
  modelApiClient?: ModelsClient;
  hierarchyApiClient?: HierarchyClient;
  echoInstance?: EchoSetupObject;
  viewerRef?: React.RefObject<HTMLCanvasElement>;
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

  const { viewer, modelApiClient, hierarchyApiClient, echoInstance } = viewerInstance;

  return (
    <modelViewerContext.Provider
      value={{
        viewer,
        modelApiClient,
        hierarchyApiClient,
        echoInstance,
        viewerRef,
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
