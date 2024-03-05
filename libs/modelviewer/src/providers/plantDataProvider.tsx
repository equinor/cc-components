import { useAppModules } from '@equinor/fusion-framework-react-app';
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { ModuleViewer } from '../modules';

import { EchoService, PlantData } from '../services/echoService';
import { useQuery } from '@tanstack/react-query';
import { Loading } from '../components/loading/loading';
import { useWarning } from '../hooks/useMessageBoundary';
import PlantSelectionDialog from '../components/plant-selection-dialog/modelSelectionDialog';

type PlantDataContextType = {
  plantData?: PlantData;
  plantsData: PlantData[];
  togglePlantSelector(): void;
};

const PlantDataContext = createContext<PlantDataContextType>({
  plantData: undefined,
  plantsData: [],
  togglePlantSelector: () => {
    // dummy function
  },
});

export const PlantDataContextProvider = ({
  children,
  facility,
}: PropsWithChildren<{ facility: string }>) => {
  const { echoClient } = useAppModules<[ModuleViewer]>().moduleViewer;
  const [isLoading, setIsLoading] = useState(true);
  const [showSelector, setShowModelDialog] = useState(false);
  const [currentPlantData, setCurrentPlantData] = useState<PlantData>();
  const [plantsData, setPlantsData] = useState<PlantData[]>([]);
  const [hasLocalPlant, setHasLocalPlant] = useState(true);
  const { setWarning } = useWarning();

  const echoService = useMemo(() => {
    if (echoClient) {
      return new EchoService(echoClient);
    }
  }, [echoClient]);

  const togglePlantSelector = () => {
    setShowModelDialog(true);
  };

  const { data: plantData } = useQuery<PlantData[]>(
    ['all-plants'],
    async () => {
      if (!echoService) {
        throw new Error('No echo service provided');
      }
      const data = await echoService?.getAvailablePlants();
      return data;
    },
    {
      enabled: Boolean(echoService),
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    if (!plantData) return;
    const localPlantCode = echoService?.getLocalPlant(facility);

    if (localPlantCode) {
      const plantByLocalInstCode = plantData?.find(
        (plant) => plant.plantCode.toLowerCase() === localPlantCode?.toLowerCase()
      );

      if (plantByLocalInstCode) {
        setCurrentPlantData(plantByLocalInstCode);
        setIsLoading(false);
      }

      return;
    }

    setHasLocalPlant(false);

    const plantByPlantCode = plantData?.find(
      (plant) => plant.plantCode.toLowerCase() === facility?.toLowerCase()
    );

    if (plantByPlantCode) {
      setCurrentPlantData(plantByPlantCode);
      setIsLoading(false);
      return;
    }

    const plantsByInstCode = plantData?.filter(
      (plant) => plant.installationCode.toLowerCase() === facility?.toLowerCase()
    );

    if (plantsByInstCode && plantsByInstCode.length > 1) {
      setPlantsData(plantsByInstCode);
      setShowModelDialog(true);
    } else if (plantsByInstCode && plantsByInstCode.length === 1) {
      setCurrentPlantData(plantsByInstCode[0]);
    }
    setIsLoading(false);
  }, [facility, plantData]);

  useEffect(() => {
    if (!isLoading && !currentPlantData && !plantData)
      setWarning('No Plant Data Available');
  }, [isLoading, currentPlantData, plantData]);

  if (isLoading) {
    return <Loading />;
  }

  if (plantsData.length > 1 && !currentPlantData && !hasLocalPlant) {
    return (
      <PlantSelectionDialog
        onSelectedPlant={(selectedPlan, remember) => {
          if (selectedPlan) {
            setCurrentPlantData(selectedPlan);
            remember && echoService?.setLocalPlant(selectedPlan);
          }
        }}
        plants={plantsData}
        selectedPlant={currentPlantData}
        showSelector={showSelector}
      />
    );
  }

  if (!currentPlantData) {
    return null;
  }

  console.log({ component: 1 });

  return (
    <PlantDataContext.Provider
      value={{ plantData: currentPlantData, plantsData, togglePlantSelector }}
    >
      {children}
    </PlantDataContext.Provider>
  );
};

export const usePlantData = () => {
  const context = useContext(PlantDataContext);
  if (!context.plantData) throw new Error('Plant data found!');
  return {
    plantData: context.plantData,
    plantsData: context.plantsData,
    togglePlantSelector: context.togglePlantSelector,
  };
};
