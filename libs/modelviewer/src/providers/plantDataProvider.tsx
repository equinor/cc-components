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

type PlantDataContextType = {
  plantData?: PlantData;
};

const PlantDataContext = createContext<PlantDataContextType>({
  plantData: undefined,
});

export const PlantDataContextProvider = ({
  children,
  plantCode,
  instCode,
}: PropsWithChildren<{ plantCode?: string; instCode?: string }>) => {
  const { echoClient } = useAppModules<[ModuleViewer]>().moduleViewer;
  const [isLoading, setIsLoading] = useState(true);

  const [currentPlantData, setCurrentPlantData] = useState<PlantData>();
  const [plantsData, setPlantsData] = useState<PlantData[]>([]);
  const { setWarning } = useWarning();

  const echoService = useMemo(() => {
    if (echoClient) {
      return new EchoService(echoClient);
    }
  }, [echoClient]);

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
    const plant = plantData?.find(
      (plant) => plant.plantCode.toLowerCase() === plantCode?.toLowerCase()
    );
    if (plant) {
      setCurrentPlantData(plant);
    }
    setIsLoading(false);
  }, [plantData, plantCode]);

  useEffect(() => {
    if (!plantData) return;
    const plants = plantData?.filter(
      (plant) => plant.installationCode.toLowerCase() === instCode?.toLowerCase()
    );

    if (plants && plants.length > 1) {
      setPlantsData(plants);
    } else if (plants && plants.length === 1) {
      setCurrentPlantData(plants[0]);
    }
    setIsLoading(false);
  }, [plantData, instCode]);

  useEffect(() => {
    if (!isLoading && !currentPlantData) setWarning('No Plant Data Available');
  }, [isLoading, currentPlantData]);

  if (!plantCode && !instCode) {
    throw new Error('No plantCode or instCode provided!');
  }

  if (isLoading) {
    return <Loading />;
  }

  if (plantsData.length > 1) {
    return <div>{JSON.stringify(plantsData)}</div>;
  }

  if (!currentPlantData) {
    return null;
  }

  return (
    <PlantDataContext.Provider value={{ plantData: currentPlantData }}>
      {children}
    </PlantDataContext.Provider>
  );
};

export const usePlantData = (): PlantData => {
  const context = useContext(PlantDataContext);
  if (!context.plantData) throw new Error('Plant data found!');
  return context.plantData;
};
