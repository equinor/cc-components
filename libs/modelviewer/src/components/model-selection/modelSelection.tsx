import { AssetMetadataSimpleDto } from '@equinor/echo-3d-viewer';
import { Button, CircularProgress } from '@equinor/eds-core-react';
import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { useModelContext } from '../../providers/modelsProvider';
import { IModuleViewerProvider } from '../../modules/provider';
import AccessDialog from '../access-dialog/accessDialog';
import ModelSelectionDialog from '../model-selection-dialog/modelSelectionDialog';

interface ModelSelectionProps {
  plantName: string;
  modelViewer: IModuleViewerProvider;
}

const ModelSelection: React.FC<PropsWithChildren<ModelSelectionProps>> = ({
  children,
  plantName,
  modelViewer,
}) => {
  const { hasAccess, showSelector, models, setShowModelDialog, isLoading } =
    useModelContext();

  const showModelSelector = () => {
    setShowModelDialog(!showSelector);
  };

  return (
    <div>
      <ViewerWrapper>
        <Button onClick={showModelSelector}>Show Selector</Button>
        {children}
      </ViewerWrapper>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          {/* Replace AccessDialog and ModelSelectionDialog with actual components */}
          <AccessDialog hasAccess={hasAccess} plantName={plantName} />
          {models !== undefined && (
            <ModelSelectionDialog models={models} modelViewer={modelViewer} />
          )}
        </>
      )}
    </div>
  );
};

export default ModelSelection;

const ViewerWrapper = styled.div`
  height: calc(100vh - 90px);
  > .reveal-viewer-spinner {
    display: none;
  }
`;
