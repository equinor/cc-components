import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

export const StyledSwitchboardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 110px;
  background: ${tokens.colors.ui.background__light.hex};
  border: 1px solid ${tokens.colors.ui.background__medium.hex};
  gap: 5ch;
  padding: 10px 5px 0px 5px;
  border-radius: 10px;
`;

export const StyledCircuitDiagram = styled.div`
  display: flex;
  width: 100%;
  overflow: auto;
  font-size: 12px;
  padding: 20px;
`;

export const StyledCircuitNameAndIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  gap: 1ch;
  background: rgb(255, 255, 255);
  border: 1px solid rgb(220, 220, 220);
  border-radius: 10px;
`;

export const StyledNetworkNameAndIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1ch;
`;

export const StyledHTCable = styled.div`
  display: flex;
  gap: 1ch;
  padding: 0px 10px;
  border-bottom: 2px dashed rgb(61, 61, 61);
  width: fit-content;
  white-space: nowrap;
  align-items: center;
  ::after {
    width: 12px;
    height: 12px;
    border: 1px solid white;
    background-color: ${(props) =>
      'black'}; //mulighet for å endre farge når pipetest blir implementert
    border-radius: 50%;
    margin: 0px 1px;
    content: ' ';
    position: relative;
    left: 2ch;
    top: 1.5ch;
  }
`;

export const StyledJunctionBox = styled.div`
  box-sizing: border-box;
  min-height: 50px;
  white-space: nowrap;
  padding: 10px 5px 0px 5px;
  border: 1px solid ${tokens.colors.ui.background__medium.hex};
  border-radius: 10px;
`;

export const StyledCable = styled.div`
  border-bottom: 2px solid black;
  height: 5ch;
  white-space: nowrap;
  padding: 0px 10px;
`;

export const StyledCriticalLine = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  width: 30px;
  height: 18px;
  color: ${tokens.colors.interactive.danger__resting.hex};
  background-color: ${tokens.colors.ui.background__light.hex};
  border: 1px solid;
  border-color: ${tokens.colors.interactive.danger__resting.hex};
  font-size: 16px;
  cursor: default;
`;

export const StyledPopover = styled.div<{ cornerButton?: boolean }>`
  position: absolute;
  z-index: 100;
  color: #fff;
  background-color: #121212;
  padding: 5px 5px;
  border-radius: 4px;
  margin-top: ${(p) => (p.cornerButton ? '40px' : '10px')};
  right: ${(p) => (p.cornerButton ? '0px' : null)};
`;

export const StyledSwitchboardChildren = styled.div<{ networkChildrenLength: number }>`
  display: grid;
  gap: 2em;
  grid-template-rows: ${({ networkChildrenLength }) =>
    new Array(networkChildrenLength).fill('1fr').join(' ')};
`;

export const Item = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  min-width: 200px;
  max-width: 1000px;
`;

export const Name = styled.div`
  border: 1px solid black;
  height: 100%;
  min-width: 75px;
  border-radius: 5px;
`;

export const StyledSpaceHeater = styled.div`
  box-sizing: border-box;
  min-height: 50px;
  white-space: nowrap;
  padding: 10px 5px 0px 5px;
  border: 1px solid ${tokens.colors.ui.background__medium.hex};
  border-radius: 10px;
`;

export const ChildWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 2em;
`;

//Filler div to place scrollbar at the bottom of screen
export const CircuitDiagramFillerDiv = styled.div`
  height: 100vh;
`;
