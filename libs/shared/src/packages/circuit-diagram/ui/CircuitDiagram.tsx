import { Fragment, forwardRef, useState } from 'react';
import { ElectricalNetwork } from '../types/ElectricalNetwork';
import {
  ChildWrapper,
  StyledItem,
  Name,
  StyledCircuitDiagram,
  StyledCircuitDiagramWrapper,
  StyledSwitchboardChildren,
} from './stylesCircuitDiagram';
import {
  CircuitDiagramSkeleton,
  Switchboard,
  HTCable,
  SpaceHeater,
  MaybeFirst,
  Cable,
  JunctionBox,
  CircuitRef,
  Light,
} from './CircuitDiagramComponents';

type CircuitDiagramProps = {
  network?: ElectricalNetwork;
  isLoading?: boolean;
  itemId: string;
};

type ElectricalComponentProps = {
  network: ElectricalNetwork;
  circuitName: string | null;
  itemId: string;
};

export function CircuitDiagram({ network, isLoading, itemId }: CircuitDiagramProps) {
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
              <Fragment key={circuit.name}>
                {circuit.children.map((circuitChildren, i) => (
                  <ElectricalComponent
                    ref={(element: HTMLDivElement | null) => {
                      if (!element || i !== 0) return;
                      setCircuitRef((old) => {
                        const isPresent = old?.[circuit.name] === element;
                        if (isPresent) return old;
                        return Object.assign({}, old, { [circuit.name]: element });
                      });
                    }}
                    network={circuitChildren}
                    key={circuitChildren.name}
                    circuitName={circuit.name}
                    itemId={itemId}
                  />
                ))}
              </Fragment>
            );
          })}
        </StyledSwitchboardChildren>
      </StyledCircuitDiagram>
    </StyledCircuitDiagramWrapper>
  );
}

const ElectricalComponent = forwardRef<HTMLDivElement, ElectricalComponentProps>(
  ({ circuitName, network, itemId }, ref) => {
    const backgroundColor = itemId === network.name ? 'lightblue' : 'white';
    switch (network.eleSymbolCode) {
      case 'HT_KAB': {
        return <HTCable network={network} backgroundColor={backgroundColor} />;
      }

      case 'VARME': {
        return <SpaceHeater network={network} backgroundColor={backgroundColor} />;
      }

      case 'KABEL': {
        return (
          <MaybeFirst circuitName={circuitName} ref={ref}>
            <Cable network={network} backgroundColor={backgroundColor} />

            <ChildWrapper>
              {network.children.map((s) => (
                <ElectricalComponent
                  network={s}
                  key={s.name}
                  circuitName={null}
                  itemId={itemId}
                />
              ))}
            </ChildWrapper>
          </MaybeFirst>
        );
      }

      case 'K_BOX': {
        return (
          <MaybeFirst circuitName={circuitName} ref={ref}>
            <JunctionBox network={network} backgroundColor={backgroundColor} />

            <ChildWrapper>
              {network.children.map((s) => (
                <ElectricalComponent
                  network={s}
                  key={s.name}
                  circuitName={null}
                  itemId={itemId}
                />
              ))}
            </ChildWrapper>
          </MaybeFirst>
        );
      }

      case 'LYS': {
        return (
          <MaybeFirst circuitName={circuitName} ref={ref}>
            <Light network={network} backgroundColor={backgroundColor} />

            <ChildWrapper>
              {network.children.map((s) => (
                <ElectricalComponent
                  network={s}
                  key={s.name}
                  circuitName={null}
                  itemId={itemId}
                />
              ))}
            </ChildWrapper>
          </MaybeFirst>
        );
      }

      // need to implement the rest
      default:
        return (
          <MaybeFirst circuitName={circuitName} ref={ref}>
            <StyledItem backgroundColor={backgroundColor}>
              <Name>{network.name}</Name>

              <ChildWrapper>
                {network.children.map((s) => (
                  <ElectricalComponent
                    network={s}
                    key={s.name}
                    circuitName={null}
                    itemId={itemId}
                  />
                ))}
              </ChildWrapper>
            </StyledItem>
          </MaybeFirst>
        );
    }
  }
);
