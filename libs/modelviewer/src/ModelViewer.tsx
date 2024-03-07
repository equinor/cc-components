import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Children, PropsWithChildren, cloneElement, isValidElement } from 'react';
import { ActionsMenu } from './components/actions-bar/ActionsMenu';
import MessageBoundary from './components/message-boundary/MessageBoundary';
import { TagsOverlay } from './components/tags-overlay/TagsOverlay';
import { ActionContextProvider } from './providers/actionProvider';
import { ModelViewerProvider } from './providers/modelViewerProvider';
import { ModelSelectionProvider } from './providers/modelSelectionProvider';
import { SelectionContextProvider } from './providers/selectionProvider';
import { TagOverlay } from './types/overlayTags';
import { PlantSelectionProvider } from './providers/plantSelectionProvider';
import { Message } from './components/message/Message';
import { ConfigContextProvider, ModelViewerConfig } from './providers/configProvider';
import { Legend } from './components/legend/Legend';
import { TagsNotFound } from './components/tags-not-found/TagsNotFound';
import { ModelProvider } from './providers/modelProvider';
import { PlantProvider } from './providers/plantProvider';

type ModelViewerProps = {
  facility: string;
  tagsOverlay: TagOverlay[];
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
          <ModelViewerContent {...props} />
        </MessageBoundary>
      </ConfigContextProvider>
    </QueryClientProvider>
  );
};

const ModelViewerContent = (props: PropsWithChildren<ModelViewerProps>) => {
  const { facility, tagsOverlay, children } = props;

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
    <PlantSelectionProvider {...{ facility }}>
      <PlantProvider>
        <ModelViewerProvider>
          <ModelSelectionProvider>
            <ModelProvider>
              <SelectionContextProvider tagsOverlay={tagsOverlay}>
                <ActionContextProvider>
                  <Legend />
                  <TagsNotFound />
                  <TagsOverlay />
                  <ActionsMenu CustomActions={components.CustomActions} />
                </ActionContextProvider>
              </SelectionContextProvider>
            </ModelProvider>
          </ModelSelectionProvider>
        </ModelViewerProvider>
      </PlantProvider>
    </PlantSelectionProvider>
  );
};

ModelViewer.CustomActions = ({ children }: PropsWithChildren) => <>{children}</>;