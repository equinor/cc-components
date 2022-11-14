import { StrictMode, useCallback, useEffect, useRef } from 'react';
import * as ReactDOM from 'react-dom/client';
import Framework, { useFramework } from '@equinor/fusion-framework-react';
import { AppConfig, AppManifest, useAppEnv } from '@equinor/fusion-framework-react/app';
import configure from './app/configure.framework';
const AppLoader = (props: { appKey: string }) => {
  const { appKey } = props;
  const fusion = useFramework();
  const ref = useRef<HTMLSpanElement>(null);
  const renderRef = useRef<VoidFunction | undefined>(undefined);

  const { config, manifest, isLoading } = useAppEnv(appKey);

  const loadApp = useCallback(
    async (
      manifest: AppManifest,
      config: AppConfig
    ): Promise<VoidFunction | undefined> => {
      const { render } = await import('./app/app');

      if (ref.current) {
        return render(ref.current, { fusion, env: { manifest, config } });
      }
      return undefined;
    },
    [ref, fusion]
  );

  useEffect(() => {
    if (!isLoading && manifest && config) {
      loadApp(manifest, config).then((x) => (renderRef.current = x));
    }
    return renderRef.current;
  }, [loadApp, isLoading, manifest, config]);

  return <span ref={ref}></span>;
};
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <Framework configure={configure} fallback={<div>Loading framework</div>}>
      <AppLoader appKey="workorder" />
    </Framework>
  </StrictMode>
);
