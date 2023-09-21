import { Icon } from '@equinor/eds-core-react';
import { warning_outlined, light } from '@equinor/eds-icons';
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
  StyledCriticalLine,
  StyledPopover,
} from './stylesCircuitDiagram';
import { Skeleton } from '@cc-components/sharedcomponents';

Icon.add({ warning_outlined, light });

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

export const CriticalLine = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return (
    <StyledCriticalLine onMouseOver={onOpen} onMouseLeave={onClose}>
      CL
      {isOpen && (
        <div>
          <StyledPopover>Heating Critical Line</StyledPopover>
        </div>
      )}
    </StyledCriticalLine>
  );
};

export const MissingCable = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return (
    <>
      <Icon name={warning_outlined.name} onMouseOver={onOpen} onMouseLeave={onClose} />
      {isOpen && <StyledPopover cornerButton>Missing a cable</StyledPopover>}
    </>
  );
};

export const SpaceHeaterIcon = () => {
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
