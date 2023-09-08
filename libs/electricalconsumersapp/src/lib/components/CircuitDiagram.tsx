import styled from 'styled-components';
import { ElectricalNetwork } from '../config/ElectricalSidesheet';
import { tokens } from '@equinor/eds-tokens';
import { useState } from 'react';
import { heat_trace, cable, junction_box, circuit } from '@equinor/eds-icons';
import { Icon } from '@equinor/eds-core-react';

Icon.add({ heat_trace, cable, junction_box, circuit });

export function CircuitDiagram({ network }: { network: ElectricalNetwork }) {
  return (
    <StyledCircuitDiagram>
      <Switchboard network={network} />
      <StyledSwitchboardChildren networkChildrenLength={network.children.length}>
        {network.children
          .map((s) => s.children)
          .flat()
          .map((s) => (
            <ElectricalComponent network={s} key={s.name} />
          ))}
      </StyledSwitchboardChildren>
    </StyledCircuitDiagram>
  );
}

function Switchboard({ network }: { network: ElectricalNetwork }) {
  return (
    <StyledSwitchboardWrapper>
      <StyledNetworkNameAndIcon>
        {network.name} <SwitchBoardIcon />
      </StyledNetworkNameAndIcon>
      {network.children.map((s) => (
        <StyledCircuitNameAndIcon key={s.name}>
          {s.name} <Icon name={circuit.name} />
          {s.isSafetyCritical ? <CriticalLine /> : null}
        </StyledCircuitNameAndIcon>
      ))}
    </StyledSwitchboardWrapper>
  );
}

const StyledSwitchboardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 110px;
  background: ${tokens.colors.ui.background__light.hex};
  border: 1px solid ${tokens.colors.ui.background__medium.hex};
  gap: 5ch;
  padding: 10px 5px 0px 5px;
  border-radius: 10px;
`;

const StyledCircuitDiagram = styled.div`
  display: flex;
  width: 100%;
  overflow: auto;
  font-size: 12px;
  padding: 20px;
`;

const StyledCircuitNameAndIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  gap: 1ch;
  background: rgb(255, 255, 255);
  border: 1px solid rgb(220, 220, 220);
  border-radius: 10px;
`;

const StyledNetworkNameAndIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1ch;
`;

const SwitchBoardIcon = () => {
  return (
    <svg
      width="2rem"
      height="1.8rem"
      viewBox="0 0 56 57"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ rotate: '0deg;' }}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M2 2.002v52.5h52.5v-52.5H2zm3.5 49v-45.5H51v45.5H5.5z"
        fill="#000"
      ></path>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M45.25 10.502h-34c-.97 0-1.75.78-1.75 1.75s.78 1.75 1.75 1.75h34c.97 0 1.75-.78 1.75-1.75s-.78-1.75-1.75-1.75zM45.25 18.502h-34c-.97 0-1.75.78-1.75 1.75s.78 1.75 1.75 1.75h34c.97 0 1.75-.78 1.75-1.75s-.78-1.75-1.75-1.75zM45.25 26.502h-34c-.97 0-1.75.78-1.75 1.75s.78 1.75 1.75 1.75h34c.97 0 1.75-.78 1.75-1.75s-.78-1.75-1.75-1.75z"
        fill="#000"
      ></path>
    </svg>
  );
};

const SpaceHeaterIcon = () => {
  return (
    <svg
      width="2rem"
      height="1.8rem"
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ rotate: '0deg' }}
    >
      <g clip-path="url(#varme_svg__clip0_1814_4864)" stroke="#132634" stroke-width="3.3">
        <path stroke-linecap="round" d="M1.65 28.684h52.7"></path>
        <path fill="#ffffff" d="M8.65 17.65h38.7v20.7H8.65z"></path>
        <path
          stroke-linecap="round"
          d="M18.15 17.984v20.033M27.55 17.984v20.033M37.451 17.984v20.033"
        ></path>
      </g>
      <defs>
        <clipPath id="varme_svg__clip0_1814_4864">
          <path fill="#fff" d="M0 0h56v56H0z"></path>
        </clipPath>
      </defs>
    </svg>
  );
};

const StyledHTCable = styled.div`
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

const StyledJunctionBox = styled.div`
  box-sizing: border-box;
  min-height: 50px;
  white-space: nowrap;
  padding: 10px 5px 0px 5px;
  border: 1px solid ${tokens.colors.ui.background__medium.hex};
  border-radius: 10px;
`;

function JunctionBox({ network }: { network: ElectricalNetwork }) {
  return (
    <StyledJunctionBox>
      <StyledNetworkNameAndIcon>
        {network.name}
        <Icon name={junction_box.name} />
        {network.isSafetyCritical ? <CriticalLine /> : null}
      </StyledNetworkNameAndIcon>
    </StyledJunctionBox>
  );
}

export const HTCable = ({ network }: { network: ElectricalNetwork }) => {
  return (
    <StyledHTCable>
      {network.name}
      <Icon name={heat_trace.name} />
      {network.isSafetyCritical ? <CriticalLine /> : null}
    </StyledHTCable>
  );
};

export const SpaceHeater = ({ network }: { network: ElectricalNetwork }) => {
  return (
    <StyledSpaceHeater>
      <StyledNetworkNameAndIcon>
        {network.name}
        <SpaceHeaterIcon />
        {network.isSafetyCritical ? <CriticalLine /> : null}
      </StyledNetworkNameAndIcon>
    </StyledSpaceHeater>
  );
};

function Cable({ network }: { network: ElectricalNetwork }) {
  return (
    <StyledCable>
      <StyledNetworkNameAndIcon>
        {network.name}
        <Icon name={cable.name} />
        {network.isSafetyCritical ? <CriticalLine /> : null}
      </StyledNetworkNameAndIcon>
    </StyledCable>
  );
}

function ElectricalComponent({ network }: { network: ElectricalNetwork }) {
  switch (network.eleSymbolCode) {
    case 'HT_KAB': {
      return <HTCable network={network} />;
    }

    case 'VARME': {
      return <SpaceHeater network={network} />;
    }

    case 'KABEL': {
      return (
        <Item>
          <Cable network={network} />

          <ChildWrapper>
            {network.children.map((s) => (
              <ElectricalComponent network={s} key={s.name} />
            ))}
          </ChildWrapper>
        </Item>
      );
    }

    case 'K_BOX': {
      return (
        <Item>
          <JunctionBox network={network} />

          <ChildWrapper>
            {network.children.map((s) => (
              <ElectricalComponent network={s} key={s.name} />
            ))}
          </ChildWrapper>
        </Item>
      );
    }

    default:
      return (
        <Item>
          <Name>{network.name}</Name>

          <ChildWrapper>
            {network.children.map((s) => (
              <ElectricalComponent network={s} key={s.name} />
            ))}
          </ChildWrapper>
        </Item>
      );
  }
}

const StyledCable = styled.div`
  border-bottom: 2px solid black;
  height: 5ch;
  white-space: nowrap;
  padding: 0px 10px;
`;

const CriticalLine = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return (
    <>
      <StyledCriticalLine onMouseOver={onOpen} onMouseLeave={onClose}>
        CL
        {isOpen && (
          <div>
            <StyledPopover>Heating Critical Line</StyledPopover>
          </div>
        )}
      </StyledCriticalLine>
    </>
  );
};

const StyledCriticalLine = styled.div`
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

const StyledPopover = styled.div<{ cornerButton?: boolean }>`
  position: absolute;
  z-index: 100;
  color: #fff;
  background-color: #121212;
  padding: 5px 5px;
  border-radius: 4px;
  margin-top: ${(p) => (p.cornerButton ? '40px' : '10px')};
  right: ${(p) => (p.cornerButton ? '0px' : null)};
`;

const StyledSwitchboardChildren = styled.div<{ networkChildrenLength: number }>`
  display: grid;
  gap: 2em;
  grid-template-rows: ${({ networkChildrenLength }) =>
    new Array(networkChildrenLength).fill('1fr').join(' ')};
`;

const Item = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  min-width: 200px;
  max-width: 1000px;
`;

const Name = styled.div`
  border: 1px solid black;
  height: 100%;
  min-width: 75px;
  border-radius: 5px;
`;

const StyledSpaceHeater = styled.div`
  box-sizing: border-box;
  min-height: 50px;
  white-space: nowrap;
  padding: 10px 5px 0px 5px;
  border: 1px solid ${tokens.colors.ui.background__medium.hex};
  border-radius: 10px;
`;

const ChildWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 2em;
`;

//Filler div to place scrollbar at the bottom of screen
const CircuitDiagramFillerDiv = styled.div`
  height: 100vh;
`;
