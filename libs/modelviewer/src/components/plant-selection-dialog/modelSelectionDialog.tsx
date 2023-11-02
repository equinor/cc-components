import { Button, Checkbox, Dialog } from '@equinor/eds-core-react';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { PlantData } from '../../services/echoService';
import PlantSelectionList from '../plant-selection-list/modelSelectionList';

interface PlantSelectionDialogProps {
  plants: PlantData[];
  selectedPlant: PlantData | undefined;
  showSelector: boolean;
  onSelectedPlant(plant?: PlantData, remember?: boolean): void;
}

const PlantSelectionDialog: React.FC<PlantSelectionDialogProps> = ({
  plants,
  selectedPlant,
  onSelectedPlant,
  showSelector,
}) => {
  const [selectedPlantData, setSelectedPlantData] = useState<PlantData>();
  const [isOpen, setIsOpen] = useState(true);

  const handleModelSelect = (plant?: PlantData) => {
    setSelectedPlantData(plant);
  };

  const [rememberChecked, setRememberChecked] = useState(false);

  useEffect(() => {
    if (selectedPlant) {
      setRememberChecked(true);
    }
  }, [selectedPlant]);

  return (
    <Dialog open={showSelector} style={{ width: 'auto' }}>
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
            onSelectedPlant(selectedPlantData, rememberChecked);
            setIsOpen(false);
          }}
          disabled={selectedPlantData === undefined}
        >
          Go
        </Button>
        <Button
          variant="ghost"
          onClick={() => {
            setIsOpen(false);
          }}
        >
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
