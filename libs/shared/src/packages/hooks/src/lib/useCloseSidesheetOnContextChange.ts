import { useRef, useEffect } from 'react';
import { useContextId } from './useContextId';
import { useFramework } from '@equinor/fusion-framework-react';

export const useCloseSidesheetOnContextChange = (closeSidesheet: VoidFunction) => {
  const id = useContextId();
  const cRef = useRef(id);

  const contextModule = useFramework().modules.context;

  useEffect(() => {
    const sub = contextModule.currentContext$.subscribe((s) => {
      if (s?.id !== cRef.current) {
        closeSidesheet();
      }
    });

    return () => {
      sub.unsubscribe();
    };
  }, [id]);
};
