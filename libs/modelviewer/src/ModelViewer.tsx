import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Children, FC, PropsWithChildren, cloneElement, isValidElement } from 'react';
import { ActionsMenu } from './components/actions-bar/ActionsMenu';
import MessageBoundary from './components/message-boundary/MessageBoundary';
import ModelSelection from './components/model-selection/modelSelection';
import { TagsOverlay } from './components/tags-overlay/TagsOverlay';
import { ActionContextProvider } from './providers/actionProvider';
import { ModelViewerContextProvider } from './providers/modelViewerProvider';
import { ModelContextProvider } from './providers/modelsProvider';
import { SelectionContextProvider } from './providers/selectionProvider';
import { TagOverlay } from './types/overlayTags';
import { PlantDataContextProvider } from './providers/plantDataProvider';
import { Message } from './components/message/Message';
import { ConfigContextProvider, ModelViewerConfig } from './providers/configProvider';
import { Legend } from './components/legend/Legend';
import { TagsNotFound } from './components/tags-not-found/TagsNotFound';

type ModelViewerProps = {
  facility: string;
  tagsOverlay?: string[] | TagOverlay[];
  options?: ModelViewerConfig;
};

export const ModelViewer = (props: PropsWithChildren<ModelViewerProps>) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ConfigContextProvider config={props.options}>
        <MessageBoundary
          fallbackComponent={
            props.options?.fallbackComponent ? props.options.fallbackComponent : Message
          }
        >
          <ModelViewerContainer {...props} />
        </MessageBoundary>
      </ConfigContextProvider>
    </QueryClientProvider>
  );
};

const ModelViewerContainer = ({
  facility,
  tagsOverlay,
  children,
}: PropsWithChildren<ModelViewerProps>) => {
  const components: { CustomActions?: React.ReactElement } = {
    CustomActions: undefined,
  };
  if (Children.count(children) != 0) {
    Children.forEach(children, (child) => {
      if (!isValidElement(child)) return;
      if (child.type === ModelViewer.CustomActions) {
        components.CustomActions = cloneElement(child);
      }
    });
  }

  return (
    <>
      <PlantDataContextProvider {...{ facility }}>
        <ModelViewerContextProvider>
          <ModelContextProvider>
            <SelectionContextProvider tagsOverlay={tagsOverlay}>
              <ModelSelection>
                <ActionContextProvider>
                  <Legend />
                  <TagsNotFound />
                  <TagsOverlay />
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

ModelViewer.CustomActions = ({ children }: PropsWithChildren) => <>{children}</>;
