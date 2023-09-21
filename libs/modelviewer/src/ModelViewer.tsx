import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Children, FC, PropsWithChildren, cloneElement, isValidElement } from 'react';
import { ActionsMenu } from './components/actions-bar/ActionsMenu';
import MessageBoundary, {
  MessageBoundaryState,
} from './components/message-boundry/MessageBoundary';
import ModelSelection from './components/model-selection/modelSelection';
import { TagsOverlay } from './components/tags-overlay/TagsOverlay';
import { ActionContextProvider } from './providers/actionProvider';
import { ModelViewerContextProvider } from './providers/modelViewerProvider';
import { ModelContextProvider } from './providers/modelsProvider';
import { SelectionContextProvider } from './providers/selectionProvider';
import { TagOverlay } from './types/overlayTags';
import { PlantDataContextProvider } from './providers/plantDataProvider';
import { Message } from './components/message/Message';

type FusionModelViewerProps = {
  instCode?: string;
  plantCode?: string;
  tagsOverlay?: string[] | TagOverlay[];
  options?: {
    iconResolver?: (type: string) => string;
    statusResolver?: (status: string) => string;
    titleResolver?: (overlay: TagOverlay) => string;
    CustomOverlayComponent?: FC<TagOverlay & { index: number }>;
    fallbackComponent?: FC<MessageBoundaryState>;
    defaultCroppingDistance?: number;
    displayStatusColor?: boolean;
    defaultCameraDistance?: number;
  };
};

export const FusionModelViewer = (props: PropsWithChildren<FusionModelViewerProps>) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <MessageBoundary
        fallbackComponent={
          props.options?.fallbackComponent ? props.options.fallbackComponent : Message
        }
      >
        <ModelViewer {...props} />
      </MessageBoundary>
    </QueryClientProvider>
  );
};

const ModelViewer = ({
  instCode,
  plantCode,
  tagsOverlay,
  options,
  children,
}: PropsWithChildren<FusionModelViewerProps>) => {
  const components: { CustomActions?: React.ReactElement } = {
    CustomActions: undefined,
  };
  if (Children.count(children) != 0) {
    Children.forEach(children, (child) => {
      if (!isValidElement(child)) return;
      if (child.type === FusionModelViewer.CustomActions) {
        components.CustomActions = cloneElement(child);
      }
    });
  }

  return (
    <>
      <PlantDataContextProvider {...{ plantCode, instCode }}>
        <ModelViewerContextProvider>
          <ModelContextProvider>
            <SelectionContextProvider
              tagsOverlay={tagsOverlay}
              selectionOptions={options}
            >
              <ModelSelection>
                <ActionContextProvider>
                  <TagsOverlay {...options} />
                  <ActionsMenu CustomActions={components.CustomActions} />
                </ActionContextProvider>
              </ModelSelection>
            </SelectionContextProvider>
          </ModelContextProvider>
        </ModelViewerContextProvider>
      </PlantDataContextProvider>
    </>
  );
};

FusionModelViewer.CustomActions = ({ children }: PropsWithChildren) => <>{children}</>;
