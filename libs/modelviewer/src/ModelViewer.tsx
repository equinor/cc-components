import { ActionsMenu } from './components/actions-bar/ActionsMenu';
import MessageBoundary from './components/message-boundry/MessageBoundary';
import ModelSelection from './components/model-selection/modelSelection';
import { ModelViewerContextProvider } from './providers/modelViewerProvider';
import { ModelContextProvider } from './providers/modelsProvider';

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
  return (
    <>
      <ModelViewerContextProvider>
        <ModelContextProvider plantCode={plantCode}>
          <ModelSelection plantName={plantName}>
            <ActionsMenu />
          </ModelSelection>
        </ModelContextProvider>
      </ModelViewerContextProvider>
    </>
  );
};
