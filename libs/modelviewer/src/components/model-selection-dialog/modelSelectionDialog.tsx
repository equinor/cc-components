import { AssetMetadataSimpleDto } from '@equinor/echo-3d-viewer';
import { Button, Checkbox, Dialog } from '@equinor/eds-core-react';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useModelSelection } from '../../hooks/useModelSelection';
import { useModelContext } from '../../providers/modelsProvider';
import ModelSelectionList from '../model-selection-list/modelSelectionList';

interface ModelSelectionDialogProps {
  models: AssetMetadataSimpleDto[];
}

const ModelSelectionDialog: React.FC<ModelSelectionDialogProps> = () => {
  const [selectedModelId, setSelectedModelId] = useState<number>(-1);

  const handleModelSelect = (id: number) => {
    setSelectedModelId(id);
  };

  const [rememberChecked, setRememberChecked] = useState(false);
  const { setShowModelDialog, showSelector, currenModelMeta } = useModelContext();
  const { handleGoToModel } = useModelSelection();

  useEffect(() => {
    if (currenModelMeta) {
      setRememberChecked(true);
    }
  }, [currenModelMeta]);

  return (
    <Dialog open={showSelector} style={{ width: 'auto' }}>
      <Dialog.Header>
        <Dialog.Title>Select Model</Dialog.Title>
      </Dialog.Header>
      <Dialog.CustomContent>
        <Selection>
          <p>Multiple models are available. Please choose a model to view.</p>
          <ModelSelectionList onModelSelect={handleModelSelect} />
          <Checkbox
            label="Remember Selection"
            onChange={(e) => setRememberChecked(e.target.checked)}
            checked={rememberChecked}
          />
        </Selection>
      </Dialog.CustomContent>
      <Dialog.Actions>
        <Button
          onClick={() => {
            handleGoToModel(selectedModelId, rememberChecked);
          }}
          disabled={selectedModelId === -1}
        >
          Go
        </Button>
        <Button
          variant="ghost"
          onClick={() => {
            setShowModelDialog(false);
          }}
        >
          Cancel
        </Button>
      </Dialog.Actions>
    </Dialog>
  );
};

export default ModelSelectionDialog;

const Selection = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 1rem;
`;
