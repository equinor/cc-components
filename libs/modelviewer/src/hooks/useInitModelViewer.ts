import { useAppModules } from '@equinor/fusion-framework-react-app';
import { useEffect, useRef, useState } from 'react';
import { ModuleViewer } from '../modules';
//DONT USE
export const useInitModelViewer = () => {
  const viewerRef = useRef<HTMLCanvasElement>(null);
  const modelViewer = useAppModules<[ModuleViewer]>().moduleViewer;
  const [isSetup, setIsSetup] = useState(false);

  //Setup modelviewer
  useEffect(() => {
    (async () => {
      if (!viewerRef.current || isSetup) return;
      await modelViewer.setup({ canvas: viewerRef.current }).finally(() => {
        setIsSetup(true);
      });
    })();
  }, [modelViewer]);

  return {
    isSetup,
    modelViewer,
    viewerRef,
  };
};
