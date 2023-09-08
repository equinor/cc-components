import { CircularProgress } from '@equinor/eds-core-react';
import React, { PropsWithChildren } from 'react';
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
  const { hasAccess, models, isLoading, modelMeta } = useModelContext();

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <div>
      <div
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <h5>
          {modelMeta?.platformNameLabel} - {modelMeta?.platformSectionLabel}
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