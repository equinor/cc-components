import { useCallback, useEffect, useRef, useState } from 'react';
import { useAppModules } from '@equinor/fusion-framework-react-app';
import { ModuleViewer } from './modules';
import styled from 'styled-components';
import { useModelsMeta } from './hooks/useModelsMeta';
import { Layer } from './modules/services/modelsService';
import MessageBoundary from './components/message-boundry/MessageBoundary';
import { useError, useInfo } from './hooks/useMessageBoundary';

const StyledCanvas = styled.canvas``;
export const Wrapper = styled.div`
  height: calc(100vh - 90px);
  > .reveal-viewer-spinner {
    display: none;
  }
`;
type FusionModelViewerProps = {
  plantCode: string;
  tags?: string[];
};

export const FusionModelViewer = ({ plantCode, tags }: FusionModelViewerProps) => {
  const viewerRef = useRef<HTMLCanvasElement>(null);
  const moduleViewer = useAppModules<[ModuleViewer]>().moduleViewer;
  const [isSetup, setIsSetup] = useState(false);
  const [layers, setLayers] = useState<Layer[]>([]);

  useEffect(() => {
    (async () => {
      if (!viewerRef.current || isSetup) return;
      await moduleViewer.setup({ canvas: viewerRef.current }).finally(() => {
        setIsSetup(true);
      });
    })();
  }, [moduleViewer]);

  useEffect(() => {
    if (isSetup) {
      moduleViewer.loadModelByPlantCode('jca');
    }
  }, [isSetup, plantCode]);

  useEffect(() => {
    moduleViewer.setTagsSelection(tags);
  }, [tags]);

  const models = useModelsMeta();
  // Setup the Echo3dClient
  // Echo3dViewer Teardown

  return (
    <MessageBoundary
      fallbackComponent={({ title, message }) => (
        // Todo: add proper fallback component
        <div>
          <h1>{title}</h1>
          <p>{message}</p>
        </div>
      )}
    >
      <Wrapper>
        <button
          onClick={() => {
            moduleViewer.modelsService?.getLayers().then((layers) => {
              setLayers(layers);
            });
          }}
        >
          getLayers
        </button>
        <div>
          {layers.map((layer) => (
            <button
              onClick={() => {
                moduleViewer.modelsService?.currentModel?.assignStyledNodeCollection(
                  layer.nodeCollection,
                  { renderGhosted: true }
                );
              }}
            >
              {layer.type} - {layer.label}
            </button>
          ))}
        </div>

        <StyledCanvas
          ref={viewerRef}
          onContextMenu={(e) => {
            e.preventDefault(); // Prevent the 'right-click-menu' from showing on the canvas
          }}
        />
      </Wrapper>
    </MessageBoundary>
  );
};
