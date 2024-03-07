import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  PlantData,
  usePlantSelectionService,
} from '../services/usePlantSelectionService';
import { Loading } from '../components/loading/loading';
import { useWarning } from '../hooks/useMessageBoundary';
import PlantSelectionDialog from '../components/plant-selection-dialog/plantSelectionDialog';
import { useAvailablePlants } from '../hooks/useAvailablePlants';

type PlantSelectionContextType = {
  currentPlant?: PlantData;
  plants: PlantData[];
  isPlantSelectionVisible: boolean;
  isLoading: boolean;
  setShowPlantDialog: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentPlant: (plant: PlantData) => void;
};

const PlantSelectionContext = createContext({} as PlantSelectionContextType);

export const usePlantSelectionContext = () => useContext(PlantSelectionContext);

type Props = {
  facility: string;
} & PropsWithChildren;

export const PlantSelectionProvider = ({ children, facility }: Props) => {
  const { setWarning } = useWarning();
  const plantSelectionService = usePlantSelectionService();

  const { data: plants, isLoading } = useAvailablePlants(facility);

  const [isPlantSelectionVisible, setShowPlantDialog] = useState(false);
  const [currentPlant, setCurrentPlant] = useState<PlantData>();

  const defaultPlant = useMemo(() => {
    const localPlantCode = plantSelectionService.getLocalPlant(facility);
    return plants?.find(
      (x) => x.plantCode.toLowerCase() === localPlantCode?.toLowerCase()
    );
  }, [plants, facility]);

  useEffect(() => {
    if (isLoading) return;
    if (currentPlant) return;

    if (defaultPlant) return setCurrentPlant(defaultPlant);
    if (plants.length === 1) return setCurrentPlant(plants[0]);
    if (plants.length > 1) return setShowPlantDialog(true);

    setWarning('No Plant Data Available');
  }, [isLoading, currentPlant, defaultPlant, plants]);

  return (
    <PlantSelectionContext.Provider
      value={{
        currentPlant,
        plants,
        isPlantSelectionVisible,
        isLoading,
        setShowPlantDialog,
        setCurrentPlant,
      }}
    >
      <PlantSelectionDialog />
      {currentPlant ? children : <Loading />}
    </PlantSelectionContext.Provider>
  );
};
