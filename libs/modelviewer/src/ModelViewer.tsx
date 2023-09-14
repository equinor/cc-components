import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  Children,
  FC,
  PropsWithChildren,
  ReactNode,
  cloneElement,
  isValidElement,
} from 'react';
import { ActionsMenu } from './components/actions-bar/ActionsMenu';
import MessageBoundary from './components/message-boundry/MessageBoundary';
import ModelSelection from './components/model-selection/modelSelection';
import { TagsOverlay } from './components/tag-overlay/tagOverlay';
import { TestPanel } from './components/test-panel/TestPanel';
import { ActionContextProvider } from './providers/actionProvider';
import { ModelViewerContextProvider } from './providers/modelViewerProvider';
import { ModelContextProvider } from './providers/modelsProvider';
import { SelectionContextProvider } from './providers/selectionProvider';
import { TagOverlay } from './types/overlayTags';

type FusionModelViewerProps = {
  plantName: string;
  plantCode: string;
  tagsOverlay?: string[] | TagOverlay[];
  children?: ReactNode;
  options?: {
    iconResolver?: (type: string) => string;
    statusResolver?: (status: string) => string;
    titleResolver?: (overlay: TagOverlay) => string;
    CustomOverlayComponent?: FC<TagOverlay & { index: number }>;
  };
};

export const FusionModelViewer = (props: PropsWithChildren<FusionModelViewerProps>) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
};

const ModelViewer = ({
  plantName,
  plantCode,
  tagsOverlay,
  options,
  children,
}: PropsWithChildren<FusionModelViewerProps>) => {

  const components: { actions?: React.ReactElement } = {
    actions: undefined,
  };

  Children.forEach(children, (child) => {
    if (!isValidElement(child)) return;
    if (child.type === FusionModelViewer.Actions) {
      components.actions = cloneElement(child);
    }
  });

  return (
    <>
      <ModelViewerContextProvider>
        <ModelContextProvider plantCode={plantCode}>
          <SelectionContextProvider tagsOverlay={tagsOverlay} {...options}>
            <ModelSelection plantName={plantName}>
              <ActionContextProvider>
                <TagsOverlay {...options} />
                <ActionsMenu Actions={components.actions} />
                <TestPanel />
              </ActionContextProvider>
            </ModelSelection>
          </SelectionContextProvider>
        </ModelContextProvider>
      </ModelViewerContextProvider>
    </>
  );
};

FusionModelViewer.Actions = (props: any) => {
  return <div>{props.children}</div>;
};
