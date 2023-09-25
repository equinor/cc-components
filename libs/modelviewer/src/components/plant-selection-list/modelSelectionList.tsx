import { Radio } from '@equinor/eds-core-react';

import styled from 'styled-components';
import { PlantData } from '../../services/echoService';
import { FC, useState } from 'react';

interface PlantSelectionListProps {
  onPlantSelect: (plant: PlantData) => void;
  selectedPlant: PlantData | undefined;
  plants: PlantData[];
}

const PlantSelectionList: FC<PlantSelectionListProps> = ({
  onPlantSelect,
  selectedPlant,
  plants,
}) => {
  const [selectPantCode, setSelectPantCode] = useState<string | undefined>(
    selectedPlant?.plantCode
  );
  return (
    <UnstyledList>
      {plants!.map((plant) => (
        <li key={plant.plantCode}>
          <Radio
            label={plant.projectDescription}
            name="models"
            value={plant.plantCode}
            checked={selectPantCode === plant.plantCode}
            onChange={(e) => {
              setSelectPantCode(plant.plantCode);
              onPlantSelect(plant);
            }}
          />
        </li>
      ))}
    </UnstyledList>
  );
};

export default PlantSelectionList;

const UnstyledList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;
