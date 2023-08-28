import { AssetMetadataSimpleDto } from '@equinor/echo-3d-viewer';
import { Button, Checkbox, Dialog, Radio } from '@equinor/eds-core-react';
import React, { useState } from 'react';
import styled from 'styled-components';

interface ModelSelectionDialogProps {
  showSelector: boolean;
  models: AssetMetadataSimpleDto[]; // Ensure 'models' are always provided
  handleGoToModel: (selectedId: number, rememberChecked: boolean) => void;
  updateShowSelector: (show: boolean) => void;
}

const ModelSelectionDialog: React.FC<ModelSelectionDialogProps> = ({
  showSelector,
  models,
  handleGoToModel,
  updateShowSelector,
}) => {
  const [rememberChecked, setRememberChecked] = useState(false);
  const [selectedModelId, setSelectedModelId] = useState<number>(-1);

  const ModelSelector: React.FC<{ models: AssetMetadataSimpleDto[] }> = ({ models }) => (
    <UnstyledList>
      {models.map((model) => (
        <li key={model.id}>
          <Radio
            label={model.platformSectionLabel}
            name="models"
            value={model.id}
            checked={selectedModelId === model.id}
            onChange={(e) => setSelectedModelId(Number(e.target.value))}
          />
        </li>
      ))}
    </UnstyledList>
  );

  return (
    <Dialog open={showSelector} style={{ width: 'auto' }}>
      <Dialog.Header>
        <Dialog.Title>Select Model</Dialog.Title>
      </Dialog.Header>
      <Dialog.CustomContent>
        <Selection>
          <p>Multiple models are available. Please choose a model to view.</p>
          <ModelSelector models={models} />
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
            updateShowSelector(false);
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

const UnstyledList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;
