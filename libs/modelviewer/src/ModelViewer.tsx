import { AssetMetadataSimpleDto } from '@equinor/echo-3d-viewer';
import { Button, CircularProgress, Dialog } from '@equinor/eds-core-react';
import { useAppModules } from '@equinor/fusion-framework-react-app';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import styled from 'styled-components';
import { ModuleViewer } from './modules';
import ModelSelectionDialog from './modules/modelSelectionDialog';
import MessageBoundary from './components/message-boundry/MessageBoundary';
import { useError, useInfo } from './hooks/useMessageBoundary';

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
    <ModelViewer {...props}/>
  </MessageBoundary>
 )
}


 const ModelViewer = ({
  plantName,
  plantCode,
  tags,
}: FusionModelViewerProps) => {
  const viewerRef = useRef<HTMLCanvasElement>(null);
  const moduleViewer = useAppModules<[ModuleViewer]>().moduleViewer;
  const [isSetup, setIsSetup] = useState(false);
  const [showSelector, setShowModelDialog] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const { setError } = useError();
  const updateShowSelector = (show: boolean) => {
    setShowModelDialog(show);
  };
  
  const handleClose = () => {
    setIsOpen(false);
  };
  
  const {
    data: models,
    isLoading,
    isError,
    error,
  } = useQuery<AssetMetadataSimpleDto[]>(
    ['models', plantCode],
    async () => {
      const data = await moduleViewer.getModelsForPlant(plantCode);
      return data;
    },
    {
      enabled: isSetup,
      refetchOnWindowFocus: false,
    }
    );
    
    //Setup modelviewer
    useEffect(() => {
      (async () => {
        if (!viewerRef.current || isSetup) return;
        await moduleViewer.setup({ canvas: viewerRef.current }).finally(() => {
          setIsSetup(true);
        });
      })();
    }, [moduleViewer]);
    
    const hasAccess = useMemo(() => {
      if (error) {
        const myError = error as Error;
        setError(myError?.message || "No access" )
    }
    return models?.length !== 0;
  }, [models, error]);

  //Init model if locally stored / remembered.
  useEffect(() => {
    if (hasAccess) {
      const localModelId = moduleViewer.getLocalModel(plantCode);
      if (localModelId !== undefined) {
        const selectedModel = models!.find(
          (model) => model.platformSectionId === localModelId
        );
        if (selectedModel?.id) {
          moduleViewer.loadModelById(selectedModel.id);
          updateShowSelector(false);
        }
      }
    }
  }, [models, plantCode]);

  //Load model on click
  const handleGoToModel = (selectedId: number, rememberChecked: boolean) => {
    moduleViewer.loadModelById(selectedId);
    if (rememberChecked) {
      const selectedModel = models?.find((model) => model.id === selectedId);
      if (selectedModel) {
        moduleViewer.setLocalModel(selectedModel);
      }
    }
    updateShowSelector(false);
  };

  useEffect(() => {
    moduleViewer.setTagsSelection(tags);
  }, [tags]);

  const showModelSelector = () => {
    updateShowSelector(!showSelector);
  };

  return (
    <>
        <ViewerWrapper>
          <Button onClick={showModelSelector}>Show Selector</Button>
          <StyledCanvas
            ref={viewerRef}
            onContextMenu={(e) => { 
              e.preventDefault(); // Prevent the right-click menu on the canvas
            }}
          />
        </ViewerWrapper>

        {isLoading ? (
          <CircularProgress />
        ) : (
          <>
            <Dialog open={!hasAccess}>
              <Dialog.Header>
                <Dialog.Title>No access</Dialog.Title>
              </Dialog.Header>
              <Dialog.CustomContent>
                <p>
                  You don't have access to any 3D Models for this plant. <br /> Search for
                  "Echo
                  {' ' + plantName}" in Access IT to apply for access.
                  <br /> Access IT requires Equinor Network connection.
                </p>
              </Dialog.CustomContent>
              <Dialog.Actions>
                <Button onClick={handleClose}>OK</Button>
              </Dialog.Actions>
            </Dialog>

            <ModelSelectionDialog
              showSelector={showSelector}
              models={models!}
              handleGoToModel={handleGoToModel}
              updateShowSelector={updateShowSelector}
            />
          </>
        )}
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
