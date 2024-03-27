import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  Children,
  Suspense,
  PropsWithChildren,
  cloneElement,
  isValidElement,
  lazy,
} from 'react';
import { ActionsMenu } from './components/actions-bar/ActionsMenu';
import { ModelViewerErrorBoundary } from './components/error-boundary/ErrorBoundary';
import { TagsOverlay } from './components/tags-overlay/TagsOverlay';
import { ActionProvider } from './providers/actionProvider';
import { ModelViewerProvider } from './providers/modelViewerProvider';
import { TagOverlay } from './types/overlayTags';

import { ConfigContextProvider, ModelViewerConfig } from './providers/configProvider';
import { Legend } from './components/legend/Legend';
import { TagsNotFound } from './components/tags-not-found/TagsNotFound';
import { Loading } from './components/loading/loading';

import {
  ModelSelectionProvider,
  TagSelectionProvider,
  PlantSelectionProvider,
  PlantProvider,
  ModelProvider,
} from './providers';


type ModelViewerProps = {
  facility: string;
  tagsOverlay: TagOverlay[];
  options?: ModelViewerConfig;
};

export const ModelViewer = (props: PropsWithChildren<ModelViewerProps>) => {
  const { facility, tagsOverlay, options } = props;

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ConfigContextProvider config={options}>
        <ModelViewerErrorBoundary
          resetKeys={[facility, tagsOverlay]}
          FallbackComponent={options?.FallbackComponent}
        >
          <ModelViewerContent {...props} />
        </ModelViewerErrorBoundary>
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
    <Suspense fallback={<Loading />}>
      <PlantSelectionProvider {...{ facility }}>
        <PlantProvider>
          <ModelViewerProvider>
            <ModelSelectionProvider>
              <ModelProvider>
                <TagSelectionProvider tagsOverlay={tagsOverlay}>
                  <ActionProvider>
                    <Legend />
                    <TagsNotFound />
                    <TagsOverlay />
                    <ActionsMenu CustomActions={components.CustomActions} />
                  </ActionProvider>
                </TagSelectionProvider>
              </ModelProvider>
            </ModelSelectionProvider>
          </ModelViewerProvider>
        </PlantProvider>
      </PlantSelectionProvider>
    </Suspense>
  );
};

ModelViewer.CustomActions = ({ children }: PropsWithChildren) => <>{children}</>;

export default ModelViewer;