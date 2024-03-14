import { PropsWithChildren, createContext, useContext, useState } from 'react';

import { Plant } from '../services/usePlantSelectionService';
import { Loading } from '../components/loading/loading';
import PlantSelectionDialog from '../components/plant-selection-dialog/plantSelectionDialog';
import React from 'react';
import { useCurrentPlant } from '../hooks/useCurrentPlant';

type PlantSelectionContextType = {
  currentPlant?: Plant;
  isPlantSelectionVisible: boolean;
  plants: Plant[];
  setShowPlantDialog: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentPlant: (plant: Plant) => void;
};

const PlantSelectionContext = createContext({} as PlantSelectionContextType);

export const usePlantSelectionContext = () => useContext(PlantSelectionContext);

type Props = {
  facility: string;
} & PropsWithChildren;

export const PlantSelectionProvider = ({ children, facility }: Props) => {
  const { plants, currentPlant, setCurrentPlant } = useCurrentPlant(facility);

  const [isPlantSelectionVisible, setShowPlantDialog] = useState(!currentPlant);

  // TODO: Add error boundary handeling for this warning: setWarning('No Plant Data Available');

  return (
    <PlantSelectionContext.Provider
      value={{
        currentPlant,
        plants,
        isPlantSelectionVisible,
        setShowPlantDialog,
        setCurrentPlant,
      }}
    >
      <PlantSelectionDialog />
      {currentPlant ? children : <Loading />}
    </PlantSelectionContext.Provider>
  );
};

export default PlantSelectionProvider;
