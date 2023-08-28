import { useEffect, useMemo, useRef, useState } from 'react';
import { useAppModules } from '@equinor/fusion-framework-react-app';
import { ModuleViewer } from './modules';
import ModelSelectionDialog from './modules/modelSelectionDialog';
import styled from 'styled-components';
import {
  Button,
  Checkbox,
  Radio,
  CircularProgress,
  Dialog,
} from '@equinor/eds-core-react';
import { AssetMetadataSimpleDto } from '@equinor/echo-3d-viewer';
import { useQuery } from '@tanstack/react-query';

type FusionModelViewerProps = {
  plantCode: string;
  tags?: string[];
};

export const FusionModelViewer = ({ plantCode, tags }: FusionModelViewerProps) => {
  const viewerRef = useRef<HTMLCanvasElement>(null);
  const moduleViewer = useAppModules<[ModuleViewer]>().moduleViewer;
  const [isSetup, setIsSetup] = useState(false);
  const [rememberChecked, updateChecked] = useState(true);
  const [showSelector, setShowModelDialog] = useState(true);

  const handleModelSelection = (selectedId: number) => {
    handleGoToModel(selectedId);
  };

  const updateShowSelector = (show: boolean) => {
    setShowModelDialog(show);
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
      console.log(myError);
    }
    return models?.length !== 0;
  }, [models, error]);

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

  function handleGoToModel(selectedId : number) {
    moduleViewer.loadModelById(selectedId);
    if (rememberChecked) {
      const selectedModel = models?.find((model) => model.id === selectedId);
      if (selectedModel) {
        moduleViewer.setLocalModel(selectedModel);
      }
    }
    updateShowSelector(false);
  }

  useEffect(() => {
    moduleViewer.setTagsSelection(tags);
  }, [tags]);

  function show() {
    updateShowSelector(!showSelector);
  }
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <ViewerWrapper>
        <Button onClick={show}>Show Selector</Button>
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
              You don't have access to any 3D Models for this plant. Search for "Echo
              ******" in Access IT to apply for access. Access IT requires Equinor Network
              connection.
            </Dialog.CustomContent>
            <Dialog.Actions>
              <Button onClick={handleClose}>OK</Button>
            </Dialog.Actions>
          </Dialog>

              <ModelSelectionDialog
                showSelector={showSelector}
                models={models}
                handleModelSelection={handleModelSelection}
                handleGoToModel={handleGoToModel}
              />

        </>
      )}
    </>
  );
};

const StyledCanvas = styled.canvas``;

export const ViewerWrapper = styled.div`
  height: calc(100vh - 90px);
  > .reveal-viewer-spinner {
    display: none;
  }
`;
