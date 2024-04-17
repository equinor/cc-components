import { PropsWithChildren, createContext, useContext } from 'react';

import { Loading } from '../components/loading/loading';
import { Plant } from '../services/usePlantSelectionService';
import { usePlantSelectionContext } from './plantSelectionProvider';

interface PlantContextState {
  currentPlant: Plant;
}

const PlantContext = createContext({} as PlantContextState);

export const usePlantContext = () => useContext(PlantContext);

export const PlantProvider = (props: PropsWithChildren) => {
  const { currentPlant } = usePlantSelectionContext();

  if (!currentPlant) {
    return <Loading />;
  }

  return (
    <PlantContext.Provider value={{ currentPlant }}>
      {props.children}
    </PlantContext.Provider>
  );
};
