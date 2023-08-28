import React, { useState } from 'react';
import {
  Button,
  Checkbox,
  Radio,
  CircularProgress,
  Dialog,
} from '@equinor/eds-core-react';
import { AssetMetadataSimpleDto } from '@equinor/echo-3d-viewer';
import styled from 'styled-components';
import { ModuleViewer } from './module';

interface ModelSelectionDialogProps {
  showSelector: boolean;
  models?: AssetMetadataSimpleDto[];
  handleModelSelection: (selectedId: number) => void;
  handleGoToModel: (selectedId: number) => void;
}

const ModelSelectionDialog: React.FC<ModelSelectionDialogProps> = ({
  showSelector,
  models,
  handleModelSelection,
  handleGoToModel,
}) => {
  const [rememberChecked, setRememberChecked] = useState(false);
  const [selectedModelId, setSelectedModelId] = useState<number>(-1);

  const onChangeRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedModelId(Number(event.target.value));
  };

  const updateChecked = (checked: boolean) => {
    setRememberChecked(checked);
  };

  const handleGoClick = () => {
    handleGoToModel(selectedModelId)
  };

  function ModelSelector({ models }: { models: AssetMetadataSimpleDto[] }) {
    return (
      <UnstyledList>
        {models.map((model) => (
          <li>
            <Radio
              key={model.id}
              label={model.platformSectionLabel}
              name="models"
              value={model.id}
              checked={selectedModelId === model.id}
              onChange={onChangeRadio}
            />
          </li>
        ))}
      </UnstyledList>
    );
  }

  return (
    <Dialog open={showSelector}>
      <Dialog.Header>
        <Dialog.Title>Select Model</Dialog.Title>
      </Dialog.Header>
      <Dialog.CustomContent>
        <Selection>
          Multiple models are available. Please choose a model to view.
          <div>
            <ModelSelector models={models!} />
          </div>
          <Checkbox
            label="Remember Selection"
            onChange={(e) => updateChecked(e.target.checked)}
            checked={rememberChecked}
          />
        </Selection>
      </Dialog.CustomContent>
      <Dialog.Actions>
        <Button onClick={handleGoClick} disabled={selectedModelId === -1}>
          Go
        </Button>
        <Button onClick={handleGoClick} variant="ghost">
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

const UnstyledList = styled.div`
  list-style: none;
`;
