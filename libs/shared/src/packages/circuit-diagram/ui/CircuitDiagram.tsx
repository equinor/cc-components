import { useState } from 'react';
import { heat_trace, cable, junction_box, circuit } from '@equinor/eds-icons';
import { Icon } from '@equinor/eds-core-react';
import { ElectricalNetwork } from '../types/ElectricalNetwork';
import {
  ChildWrapper,
  Item,
  Name,
  StyledCable,
  StyledCircuitDiagram,
  StyledCircuitNameAndIcon,
  StyledCriticalLine,
  StyledHTCable,
  StyledJunctionBox,
  StyledNetworkNameAndIcon,
  StyledPopover,
  StyledSpaceHeater,
  StyledSwitchboardChildren,
  StyledSwitchboardWrapper,
} from './stylesCircuitDiagram';

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
