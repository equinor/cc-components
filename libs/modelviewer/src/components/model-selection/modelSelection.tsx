import { CircularProgress } from '@equinor/eds-core-react';
import React, { PropsWithChildren } from 'react';
import { useModelContext } from '../../providers/modelsProvider';
import AccessDialog from '../access-dialog/accessDialog';
import ModelSelectionDialog from '../model-selection-dialog/modelSelectionDialog';
import { usePlantData } from '../../providers/plantDataProvider';
import { Loading } from '../loading/loading';

const ModelSelection: React.FC<PropsWithChildren> = ({ children }) => {
  const { hasAccess, models, isLoading, modelMeta } = useModelContext();
  const { plantData } = usePlantData();

  if (isLoading) {
    return <Loading />;
  }

  if (!hasAccess) {
    return <AccessDialog plantName={plantData.projectDescription} />;
  }

  return (
    <>
      {modelMeta && children}
      {models && models.length > 0 && <ModelSelectionDialog models={models} />}
    </>
  );
};

export default ModelSelection;
