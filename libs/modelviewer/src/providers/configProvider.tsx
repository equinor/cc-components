import { FC, PropsWithChildren, createContext, useContext } from 'react';

import { TagOverlay } from '../types';
import { MessageBoundaryState } from '../components/message-boundary/MessageBoundary';

type ConfigContextType = {
  iconResolver?: (type: string) => string;
  statusResolver?: (status: string) => string;
  titleResolver?: (overlay: TagOverlay) => string;
  CustomOverlayComponent?: FC<
    TagOverlay & {
      index: number;
      isSelected: boolean;
      clearSelection: () => void;
    }
  >;
  fallbackComponent?: FC<MessageBoundaryState>;
  defaultCroppingDistance: number;
  displayStatusColor: boolean;
  defaultRadiusFactor: number;

  defaultCameraMoveDuration: number;
};
export type ModelViewerConfig = Partial<ConfigContextType>;

const init: ConfigContextType = {
  defaultRadiusFactor: 2,
  displayStatusColor: true,
  defaultCroppingDistance: 1,
  defaultCameraMoveDuration: 10,
};

const ConfigContext = createContext<ConfigContextType>(init);

export const ConfigContextProvider = ({
  children,
  config,
}: PropsWithChildren<{ config?: ModelViewerConfig }>) => (
  <ConfigContext.Provider value={{ ...init, ...config }}>
    {children}
  </ConfigContext.Provider>
);

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (!context) throw new Error('No Config Context found!');
  return context;
};
