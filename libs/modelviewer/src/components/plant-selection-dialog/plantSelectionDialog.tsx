import { Button, Checkbox, Dialog, Divider } from '@equinor/eds-core-react';
import { ReactElement, useState } from 'react';
import styled from 'styled-components';

import { Plant, usePlantSelectionService } from '../../services/usePlantSelectionService';
import PlantSelectionList from '../plant-selection-list/modelSelectionList';
import { usePlantSelectionContext } from '../../providers/plantSelectionProvider';

export const PlantSelectionDialog = (): ReactElement => {
  const plantSelectionService = usePlantSelectionService();

  const { plants, setCurrentPlant, setShowPlantDialog, isPlantSelectionVisible } =
    usePlantSelectionContext();

  const [selectedPlant, setSelectedPlant] = useState<Plant>();
  const [rememberSelectedPlant, setRememberSelectedPlant] = useState(false);

  const handleModelSelect = (plant: Plant) => {
    setSelectedPlant(plant);
  };

  const onSelect = async () => {
    if (!selectedPlant) {
      throw Error('The selected model does not exist');
    }

    if (rememberSelectedPlant) {
      plantSelectionService.setDefaultPlant(selectedPlant);
    }

    setCurrentPlant(selectedPlant);
    setShowPlantDialog(false);
  };

  const onCancel = () => {
    setShowPlantDialog(false);
  };

  return (
    <Dialog open={isPlantSelectionVisible} style={{ width: 'auto' }}>
      <Dialog.Header>
        <Dialog.Title>Select Plant</Dialog.Title>
      </Dialog.Header>
      <Dialog.CustomContent>
        <Selection>
          <p>Multiple plants are available. Please choose a plant to view.</p>
          <PlantSelectionList
            onPlantSelect={handleModelSelect}
            plants={plants}
            selectedPlant={selectedPlant}
          />
        </Selection>

        <Divider />

        <Checkbox
          label="Remember Selection"
          onChange={(e) => setRememberSelectedPlant(e.target.checked)}
          checked={rememberSelectedPlant}
        />
      </Dialog.CustomContent>
      <Dialog.Actions>
        <Button onClick={onSelect} disabled={selectedPlant === undefined}>
          Go
        </Button>
        <Button variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
      </Dialog.Actions>
    </Dialog>
  );
};

export default PlantSelectionDialog;

const Selection = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 1rem;
`;
