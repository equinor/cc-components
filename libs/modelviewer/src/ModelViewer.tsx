import { useState } from 'react';
import { ActionsMenu } from './components/actions-bar/ActionsMenu';
import MessageBoundary from './components/message-boundry/MessageBoundary';
import ModelSelection from './components/model-selection/modelSelection';
import { TestPanel } from './components/test-panel/TestPanel';
import { ModelViewerContextProvider } from './providers/modelViewerProvider';
import { ModelContextProvider } from './providers/modelsProvider';
import { SelectionContextProvider } from './providers/selectionProvider';
import { ActionContextProvider } from './providers/actionProvider';

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
  const [tagList, setTagList] = useState<string[]>([]);
  return (
    <>
      <ModelViewerContextProvider>
        <ModelContextProvider plantCode={plantCode}>
          <SelectionContextProvider tags={tagList}>
            <ModelSelection plantName={plantName}>
              <ActionContextProvider>
                <ActionsMenu />
                <TestPanel setTags={(tags: string[]) => setTagList(tags)} />
              </ActionContextProvider>
            </ModelSelection>
          </SelectionContextProvider>
        </ModelContextProvider>
      </ModelViewerContextProvider>
    </>
  );
};
