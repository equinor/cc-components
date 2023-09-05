import { Button, CircularProgress } from '@equinor/eds-core-react';
import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { useModelContext } from '../../providers/modelsProvider';
import AccessDialog from '../access-dialog/accessDialog';
import ModelSelectionDialog from '../model-selection-dialog/modelSelectionDialog';

interface ModelSelectionProps {
  plantName: string;
}

const ModelSelection: React.FC<PropsWithChildren<ModelSelectionProps>> = ({
  children,
  plantName,
}) => {
  const {
    hasAccess,
    showSelector,
    models,
    setShowModelDialog,
    isLoading,
    currenModelMeta,
  } = useModelContext();

  const showModelSelector = () => {
    setShowModelDialog(!showSelector);
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <div>
      <div
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <h5>
          {currenModelMeta?.platformNameLabel} - {currenModelMeta?.platformSectionLabel}
        </h5>
      </div>
      {children}

      {models && models.length > 0 ? (
        <ModelSelectionDialog models={models} />
      ) : (
        <AccessDialog hasAccess={hasAccess} plantName={plantName} />
      )}
    </div>
  );
};

export default ModelSelection;
