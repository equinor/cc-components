import { Icon } from '@equinor/eds-core-react';
import { warning_outlined, light, thermostat, battery } from '@equinor/eds-icons';
import { useState, forwardRef, ReactNode } from 'react';
import { ElectricalNetwork } from '../types';
import {
  StyledSwitchboardWrapper,
  StyledCircuitNameAndIconWrapper,
  StyledCircuitNameAndIcon,
  StyledHTCable,
  StyledSpaceHeater,
  StyledNetworkNameAndIcon,
  StyledCable,
  StyledJunctionBox,
  StyledFirstItem,
  StyledItem,
  StyledPopover,
  StyledDefaultComponent,
} from './stylesCircuitDiagram';
import { Skeleton } from '@cc-components/sharedcomponents';
import {
  SpaceHeaterIcon,
  MissingCable,
  ElectricalOutletIcon,
  PanelIcon,
  MotorIcon,
  SwitchIcon,
  InstrumentIcon,
  TransformerIcon,
  UnknownIcon,
} from './Icons';

Icon.add({ warning_outlined, light, thermostat, battery });

export type CircuitRef = Record<string, HTMLDivElement>;

export function Switchboard({
  network,
  circuitRef,
}: {
  network: ElectricalNetwork;
  circuitRef: CircuitRef;
}) {
  return (
    <StyledSwitchboardWrapper>
      {network.name}
      {network.children.map((circuit) => {
        const maybeRef = circuitRef?.[circuit.name];
        return (
          <StyledCircuitNameAndIconWrapper key={circuit.name} maybeRef={maybeRef}>
            <StyledCircuitNameAndIcon key={circuit.name} style={{ minWidth: '76px' }}>
              {circuit.name}
            </StyledCircuitNameAndIcon>
          </StyledCircuitNameAndIconWrapper>
        );
      })}
    </StyledSwitchboardWrapper>
  );
}

export function HTCable({
  network,
  backgroundColor,
}: {
  network: ElectricalNetwork;
  backgroundColor: string;
}) {
  return <StyledHTCable backgroundColor={backgroundColor}>{network.name}</StyledHTCable>;
}

export function SpaceHeater({
  network,
  backgroundColor,
}: {
  network: ElectricalNetwork;
  backgroundColor: string;
}) {
  return (
    <StyledSpaceHeater backgroundColor={backgroundColor}>
      <StyledNetworkNameAndIcon>
        {network.name}
        <SpaceHeaterIcon />
      </StyledNetworkNameAndIcon>
    </StyledSpaceHeater>
  );
}

export function Cable({
  network,
  backgroundColor,
}: {
  network: ElectricalNetwork;
  backgroundColor: string;
}) {
  return <StyledCable backgroundColor={backgroundColor}>{network.name}</StyledCable>;
}

export function JunctionBox({
  network,
  backgroundColor,
}: {
  network: ElectricalNetwork;
  backgroundColor: string;
}) {
  return (
    <>
      {network.missingCable ? <MissingCable /> : null}
      <StyledJunctionBox backgroundColor={backgroundColor}>
        {network.name}
      </StyledJunctionBox>
    </>
  );
}

export function Light({
  network,
  backgroundColor,
}: {
  network: ElectricalNetwork;
  backgroundColor: string;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  return (
    <StyledItem backgroundColor={backgroundColor}>
      <StyledDefaultComponent>
        <StyledNetworkNameAndIcon>
          {network.name}
          <Icon
            name={light.name}
            height={21}
            width={21}
            onMouseOver={onOpen}
            onMouseLeave={onClose}
          />
          {isOpen && <StyledPopover>Light</StyledPopover>}
        </StyledNetworkNameAndIcon>
      </StyledDefaultComponent>
    </StyledItem>
  );
}

export function ElectricalOutlet({
  network,
  backgroundColor,
}: {
  network: ElectricalNetwork;
  backgroundColor: string;
}) {
  return (
    <StyledItem backgroundColor={backgroundColor}>
      <StyledDefaultComponent>
        <StyledNetworkNameAndIcon>
          {network.name} <ElectricalOutletIcon />
        </StyledNetworkNameAndIcon>
      </StyledDefaultComponent>
    </StyledItem>
  );
}

export function ControlPanel({
  network,
  backgroundColor,
  popoverText,
}: {
  network: ElectricalNetwork;
  backgroundColor: string;
  popoverText: string;
}) {
  return (
    <StyledItem backgroundColor={backgroundColor}>
      <StyledDefaultComponent>
        <StyledNetworkNameAndIcon>
          {network.name} <PanelIcon popoverText={popoverText} />
        </StyledNetworkNameAndIcon>
      </StyledDefaultComponent>
    </StyledItem>
  );
}

export function Motor({
  network,
  backgroundColor,
}: {
  network: ElectricalNetwork;
  backgroundColor: string;
}) {
  return (
    <StyledItem backgroundColor={backgroundColor}>
      <StyledDefaultComponent>
        <StyledNetworkNameAndIcon>
          {network.name} <MotorIcon />
        </StyledNetworkNameAndIcon>
      </StyledDefaultComponent>
    </StyledItem>
  );
}

export function Switch({
  network,
  backgroundColor,
}: {
  network: ElectricalNetwork;
  backgroundColor: string;
}) {
  return (
    <StyledItem backgroundColor={backgroundColor}>
      <StyledDefaultComponent>
        <StyledNetworkNameAndIcon>
          {network.name} <SwitchIcon />
        </StyledNetworkNameAndIcon>
      </StyledDefaultComponent>
    </StyledItem>
  );
}

export function Thermostat({
  network,
  backgroundColor,
}: {
  network: ElectricalNetwork;
  backgroundColor: string;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  return (
    <StyledItem backgroundColor={backgroundColor}>
      <StyledDefaultComponent>
        <StyledNetworkNameAndIcon>
          {network.name}
          <Icon
            name={thermostat.name}
            height={21}
            width={21}
            onMouseOver={onOpen}
            onMouseLeave={onClose}
          />
          {isOpen && <StyledPopover>Thermostat</StyledPopover>}
        </StyledNetworkNameAndIcon>
      </StyledDefaultComponent>
    </StyledItem>
  );
}

export function Battery({
  network,
  backgroundColor,
}: {
  network: ElectricalNetwork;
  backgroundColor: string;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  return (
    <StyledItem backgroundColor={backgroundColor}>
      <StyledDefaultComponent>
        <StyledNetworkNameAndIcon>
          {network.name}
          <Icon
            name={battery.name}
            height={21}
            width={21}
            onMouseOver={onOpen}
            onMouseLeave={onClose}
          />
          {isOpen && <StyledPopover>Battery</StyledPopover>}
        </StyledNetworkNameAndIcon>
      </StyledDefaultComponent>
    </StyledItem>
  );
}

export function Instrument({
  network,
  backgroundColor,
}: {
  network: ElectricalNetwork;
  backgroundColor: string;
}) {
  return (
    <StyledItem backgroundColor={backgroundColor}>
      <StyledDefaultComponent>
        <StyledNetworkNameAndIcon>
          {network.name} <InstrumentIcon />
        </StyledNetworkNameAndIcon>
      </StyledDefaultComponent>
    </StyledItem>
  );
}

export function Transformer({
  network,
  backgroundColor,
}: {
  network: ElectricalNetwork;
  backgroundColor: string;
}) {
  return (
    <StyledItem backgroundColor={backgroundColor}>
      <StyledDefaultComponent>
        <StyledNetworkNameAndIcon>
          {network.name} <TransformerIcon />
        </StyledNetworkNameAndIcon>
      </StyledDefaultComponent>
    </StyledItem>
  );
}

export function Unknown({
  network,
  backgroundColor,
}: {
  network: ElectricalNetwork;
  backgroundColor: string;
}) {
  return (
    <StyledItem backgroundColor={backgroundColor}>
      <StyledDefaultComponent>
        <StyledNetworkNameAndIcon>
          {network.name} <UnknownIcon />
        </StyledNetworkNameAndIcon>
      </StyledDefaultComponent>
    </StyledItem>
  );
}

export const MaybeFirst = forwardRef<
  HTMLDivElement,
  { circuitName: string | null; children: ReactNode }
>(({ circuitName, children }, ref) => (
  <>
    {circuitName ? (
      <StyledFirstItem ref={ref}>{children}</StyledFirstItem>
    ) : (
      <StyledItem>{children}</StyledItem>
    )}
  </>
));

export function CircuitDiagramSkeleton() {
  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        margin: '10px',
      }}
    >
      <Skeleton height="150px" width="110px" />
      <Skeleton height="15px" width="110px" />
      <Skeleton height="100px" width="50px" />
      <div
        style={{
          display: 'flex',
          height: '100px',
          justifyContent: 'space-around',
          flexDirection: 'column',
        }}
      >
        <Skeleton height="15px" width="110px" />
        <Skeleton height="15px" width="110px" />
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '5px',
        }}
      >
        <Skeleton height="50px" width="50px" />
        <Skeleton height="50px" width="50px" />
      </div>
    </div>
  );
}
