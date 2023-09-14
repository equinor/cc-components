import { FC, PropsWithChildren } from 'react';
import { ActionsMenu } from './components/actions-bar/ActionsMenu';
import MessageBoundary from './components/message-boundry/MessageBoundary';
import ModelSelection from './components/model-selection/modelSelection';
import { TestPanel } from './components/test-panel/TestPanel';
import { ModelViewerContextProvider } from './providers/modelViewerProvider';
import { ModelContextProvider } from './providers/modelsProvider';
import { SelectionContextProvider } from './providers/selectionProvider';
import { ActionContextProvider } from './providers/actionProvider';
import { TagsOverlay } from './components/tags-overlay/TagsOverlay';
import { TagOverlay } from './types/overlayTags';

type FusionModelViewerProps = {
  plantName: string;
  plantCode: string;
  tagsOverlay?: string[] | TagOverlay[];
  options?: {
    iconResolver?: (type: string) => string;
    statusResolver?: (status: string) => string;
    titleResolver?: (overlay: TagOverlay) => string;
    CustomOverlayComponent?: FC<TagOverlay & { index: number }>;
  };
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

const ModelViewer = ({
  plantName,
  plantCode,
  tagsOverlay,
  options,
}: PropsWithChildren<FusionModelViewerProps>) => {
  return (
    <>
      <ModelViewerContextProvider>
        <ModelContextProvider plantCode={plantCode}>
          <SelectionContextProvider tagsOverlay={tagsOverlay} {...options}>
            <ModelSelection plantName={plantName}>
              <ActionContextProvider>
                <TagsOverlay {...options} />
                <ActionsMenu />
                <TestPanel />
              </ActionContextProvider>
            </ModelSelection>
          </SelectionContextProvider>
        </ModelContextProvider>
      </ModelViewerContextProvider>
    </>
  );
};
