import { ReactNode, forwardRef, useState } from 'react';
import { warning_outlined } from '@equinor/eds-icons';
import { Icon } from '@equinor/eds-core-react';
import { ElectricalNetwork } from '../types/ElectricalNetwork';
import {
  ChildWrapper,
  StyledFirstItem,
  StyledItem,
  Name,
  StyledCable,
  StyledCircuitDiagram,
  StyledCircuitDiagramWrapper,
  StyledCriticalLine,
  StyledHTCable,
  StyledJunctionBox,
  StyledNetworkName,
  StyledPopover,
  StyledSpaceHeater,
  StyledSwitchboardChildren,
  StyledSwitchboardWrapper,
  StyledCircuitNameAndIcon,
  StyledCircuitNameAndIconWrapper,
} from './stylesCircuitDiagram';
import { Skeleton } from '@cc-components/sharedcomponents';

Icon.add({ warning_outlined });

type CircuitRef = Record<string, HTMLDivElement>;

type CircuitDiagramProps = {
  network?: ElectricalNetwork;
  isLoading?: boolean;
};

export function CircuitDiagram({ network, isLoading }: CircuitDiagramProps) {
  const [circuitRef, setCircuitRef] = useState<CircuitRef>({});

  if (!!isLoading || !network) {
    return <CircuitDiagramSkeleton />;
  }
  return (
    <StyledCircuitDiagramWrapper>
      <StyledCircuitDiagram>
        <Switchboard network={network} circuitRef={circuitRef} />
        <StyledSwitchboardChildren>
          {network.children.map((circuit) => {
            return (
              <>
                {circuit.children.map((circuitChildren) => (
                  <ElectricalComponent
                    ref={(element: HTMLDivElement | null) => {
                      if (!element) return;
                      setCircuitRef((old) => {
                        const isPresent = old?.[circuit.name] === element;
                        if (isPresent) return old;
                        return Object.assign({}, old, { [circuit.name]: element });
                      });
                    }}
                    network={circuitChildren}
                    key={circuitChildren.name}
                    circuitName={circuit.name}
                  />
                ))}
              </>
            );
          })}
        </StyledSwitchboardChildren>
      </StyledCircuitDiagram>
    </StyledCircuitDiagramWrapper>
  );
}

function Switchboard({
  network,
  circuitRef,
}: {
  network: ElectricalNetwork;
  circuitRef: CircuitRef;
}) {
  return (
    <StyledSwitchboardWrapper>
      <StyledNetworkName>{network.name}</StyledNetworkName>
      {network.children.map((circuit) => {
        const maybeRef = circuitRef?.[circuit.name];
        return (
          <StyledCircuitNameAndIconWrapper maybeRef={maybeRef}>
            <StyledCircuitNameAndIcon key={circuit.name} style={{ minWidth: '76px' }}>
              {circuit.name}
            </StyledCircuitNameAndIcon>
          </StyledCircuitNameAndIconWrapper>
        );
      })}
    </StyledSwitchboardWrapper>
  );
}

const MaybeFirst = forwardRef<
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

type ElectricalComponentProps = {
  network: ElectricalNetwork;
  circuitName: string | null;
};

const ElectricalComponent = forwardRef<HTMLDivElement, ElectricalComponentProps>(
  ({ circuitName, network }, ref) => {
    switch (network.eleSymbolCode) {
      case 'HT_KAB': {
        return <HTCable network={network} />;
      }

      case 'VARME': {
        return <SpaceHeater network={network} />;
      }

      case 'KABEL': {
        return (
          <MaybeFirst circuitName={circuitName} ref={ref}>
            <Cable network={network} />

            <ChildWrapper>
              {network.children.map((s) => (
                <ElectricalComponent network={s} key={s.name} circuitName={null} />
              ))}
            </ChildWrapper>
          </MaybeFirst>
        );
      }

      case 'K_BOX': {
        return (
          <MaybeFirst circuitName={circuitName} ref={ref}>
            <JunctionBox network={network} />

            <ChildWrapper>
              {network.children.map((s) => (
                <ElectricalComponent network={s} key={s.name} circuitName={null} />
              ))}
            </ChildWrapper>
          </MaybeFirst>
        );
      }

      // need to implement the rest
      default:
        return (
          <StyledItem>
            <Name>{network.name}</Name>

            <ChildWrapper>
              {network.children.map((s) => (
                <ElectricalComponent network={s} key={s.name} circuitName={null} />
              ))}
            </ChildWrapper>
          </StyledItem>
        );
    }
  }
);

export const HTCable = ({ network }: { network: ElectricalNetwork }) => {
  return <StyledHTCable>{network.name}</StyledHTCable>;
};

export const SpaceHeater = ({ network }: { network: ElectricalNetwork }) => {
  return (
    <StyledSpaceHeater>
      <StyledNetworkName>
        {network.name}
        <SpaceHeaterIcon />
      </StyledNetworkName>
    </StyledSpaceHeater>
  );
};

function Cable({ network }: { network: ElectricalNetwork }) {
  return (
    <StyledCable>
      <StyledNetworkName>{network.name}</StyledNetworkName>
    </StyledCable>
  );
}

function JunctionBox({ network }: { network: ElectricalNetwork }) {
  return (
    <>
      {network.missingCable ? <MissingCable /> : null}
      <StyledJunctionBox>
        <StyledNetworkName>{network.name}</StyledNetworkName>
      </StyledJunctionBox>
    </>
  );
}

const CriticalLine = (): JSX.Element => {
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

const MissingCable = (): JSX.Element => {
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
