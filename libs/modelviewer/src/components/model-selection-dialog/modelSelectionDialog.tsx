import { Button, Checkbox, Dialog, Divider } from '@equinor/eds-core-react';
import { ReactElement, useState } from 'react';
import styled from 'styled-components';

import { useModelSelectionContext } from '../../providers/modelSelectionProvider';
import ModelSelectionList from '../model-selection-list/modelSelectionList';
import { useModelSelectionService } from '../../services';
import { AccessError, NoAvailableModelsError } from '../../types/errors';

export const ModelSelectionDialog = (): ReactElement => {
  const modelSelectionService = useModelSelectionService();

  const { setShowModelDialog, setModelMeta, isModelSelectionVisible, models, hasAccess } =
    useModelSelectionContext();

  const [selectedModelId, setSelectedModelId] = useState<number>(-1);

  const [rememberSelectedModel, setRememberSelectedModel] = useState(true);

  const handleModelSelect = (id: number) => {
    setSelectedModelId(id);
  };

  const onSelect = async () => {
    const selectedModel = models.find((model) => model.id === selectedModelId);

    if (!selectedModel) {
      setShowModelDialog(false);
      throw Error('The selected model does not exist');
    }

    if (rememberSelectedModel) {
      modelSelectionService.setDefaultModel(selectedModel);
    }

    setModelMeta(selectedModel);
    setShowModelDialog(false);
  };

  const onCancel = () => {
    setShowModelDialog(false);
  };

  if (!hasAccess) {
    throw new AccessError("You don't have access to any 3D Models for this plant.");
  }

  if (models.length <= 0) {
    throw new NoAvailableModelsError();
  }

  return (
    <Dialog open={isModelSelectionVisible} style={{ width: 'auto' }}>
      <Dialog.Header>
        <Dialog.Title>Select model</Dialog.Title>
      </Dialog.Header>
      <Dialog.CustomContent>
        <Selection>
          <span>Multiple models are available. Please choose a model to view.</span>
          <ModelSelectionList onModelSelect={handleModelSelect} />
        </Selection>

        <Divider />

        <Checkbox
          label="Remember selection"
          onChange={(e) => setRememberSelectedModel(e.target.checked)}
          checked={rememberSelectedModel}
        />
      </Dialog.CustomContent>
      <Dialog.Actions>
        <Button onClick={onSelect} disabled={selectedModelId === -1}>
          Select
        </Button>
        <Button variant="ghost" onClick={onCancel}>
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
