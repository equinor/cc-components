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
import { IModuleViewerProvider } from '../modules/provider';

type modelViewerContextType = {
    modelViewer: IModuleViewerProvider | null;
    viewerRef: React.RefObject<HTMLCanvasElement> | null;
    isSetup: boolean;
  };
  
  const modelViewerContext = createContext<modelViewerContextType>({
    modelViewer: null,
    viewerRef: null,
    isSetup: false,
  });

export const ModelViewerContextProvider = ({ children }: PropsWithChildren) => {
  const viewerRef = useRef<HTMLCanvasElement>(null);
  const modelViewer = useAppModules<[ModuleViewer]>().moduleViewer;
  const [isSetup, setIsSetup] = useState(false);

  useEffect(() => {
    (async () => {
      if (!viewerRef.current || isSetup) return;
      await modelViewer.setup({ canvas: viewerRef.current }).finally(() => {
        setIsSetup(true);
      });
    })();
  }, [modelViewer]);

  return (
    <modelViewerContext.Provider
      value={{
        modelViewer,
        viewerRef,
        isSetup,
      }}
    >
      {children}
    </modelViewerContext.Provider>
  );
};

export const useModelViewerContext = () => {
  const context = useContext(modelViewerContext);
  if (!context) throw new Error('Context provider not found!');
  return context;
};
