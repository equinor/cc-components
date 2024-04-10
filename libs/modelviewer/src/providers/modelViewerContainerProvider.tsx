import { PropsWithChildren, createContext, useContext, useRef } from 'react';
import styled from 'styled-components';

import { Canvas } from '../components/canvas/canvas';

type ModelViewerContainerContextType = {
  canvas: React.RefObject<HTMLCanvasElement>;
};

const ModelViewerContainerContext = createContext<ModelViewerContainerContextType>(
  {} as ModelViewerContainerContextType
);

export const useModelViewerContainerContext = () =>
  useContext(ModelViewerContainerContext);

export const ModelViewerContainerProvider = ({ children }: PropsWithChildren) => {
  const viewerRef = useRef<HTMLCanvasElement>(null);

  console.log({ current: viewerRef.current });

  return (
    <Container>
      <Canvas viewerRef={viewerRef} />
      <ModelViewerContainerContext.Provider value={{ canvas: viewerRef }}>
        {children}
      </ModelViewerContainerContext.Provider>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;
