import { Button, CircularProgress } from '@equinor/eds-core-react';
import styled from 'styled-components';
import AccessDialog from './components/access-dialog/accessDialog';
import MessageBoundary from './components/message-boundry/MessageBoundary';
import ModelSelectionDialog from './components/model-selection-dialog/modelSelectionDialog';
import { useInitModelViewer } from './hooks/useInitModelViewer';
import { ModelContextProvider, useModelContext } from './providers/modelsProvider';
import { PropsWithChildren } from 'react';
import { IModuleViewerProvider } from './modules/provider';
import ModelSelection from './components/model-selection/modelSelection';

type FusionModelViewerProps = {
  plantName: string;
  plantCode: string;
  tags?: string[];
};

export const FusionModelViewer = (props: FusionModelViewerProps) => {
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
      <ModelViewer {...props} />
    </MessageBoundary>
  );
};

const ModelViewer = ({ plantName, plantCode, tags }: FusionModelViewerProps) => {
  const { isSetup, modelViewer, viewerRef } = useInitModelViewer();

  return (
    <>
      <ModelContextProvider
        plantCode={plantCode}
        modelViewer={modelViewer}
        isSetup={isSetup}
      >
        <ModelSelection modelViewer={modelViewer} plantName={plantName}>
          <StyledCanvas
            ref={viewerRef}
            onContextMenu={(e) => {
              e.preventDefault(); // Prevent the right-click menu on the canvas
            }}
          />
        </ModelSelection>
      </ModelContextProvider>
    </>
  );
};

const StyledCanvas = styled.canvas``;

const ViewerWrapper = styled.div`
  height: calc(100vh - 90px);
  > .reveal-viewer-spinner {
    display: none;
  }
`;
