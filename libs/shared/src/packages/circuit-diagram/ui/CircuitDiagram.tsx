import { Fragment, forwardRef, useState } from 'react';
import { ElectricalNetwork } from '../types/ElectricalNetwork';
import {
  ChildWrapper,
  StyledItem,
  StyledCircuitDiagram,
  StyledCircuitDiagramWrapper,
  StyledSwitchboardChildren,
  StyledDefaultComponent,
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
  ElectricalOutlet,
  ControlPanel,
  Motor,
  Switch,
  Thermostat,
  Battery,
  Instrument,
  Transformer,
  Unknown,
} from './CircuitDiagramComponents';

type CircuitDiagramProps = {
  network?: ElectricalNetwork;
  isLoading?: boolean;
  itemNo: string;
};

type ElectricalComponentProps = {
  network: ElectricalNetwork;
  circuitName: string | null;
  itemId: string;
};

export function CircuitDiagram({ network, isLoading, itemNo }: CircuitDiagramProps) {
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
                    itemId={itemNo}
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

      case 'STIKK': {
        return (
          <MaybeFirst circuitName={circuitName} ref={ref}>
            <ElectricalOutlet network={network} backgroundColor={backgroundColor} />

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

      case 'KURSI': {
        return (
          <MaybeFirst circuitName={circuitName} ref={ref}>
            <ControlPanel
              network={network}
              backgroundColor={backgroundColor}
              popoverText="Kurs I"
            />

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

      case 'KONT_P': {
        return (
          <MaybeFirst circuitName={circuitName} ref={ref}>
            <ControlPanel
              network={network}
              backgroundColor={backgroundColor}
              popoverText="Kontrollpanel"
            />

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

      case 'MOTOR': {
        return (
          <MaybeFirst circuitName={circuitName} ref={ref}>
            <Motor network={network} backgroundColor={backgroundColor} />

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

      case 'SWITCH': {
        return (
          <MaybeFirst circuitName={circuitName} ref={ref}>
            <Switch network={network} backgroundColor={backgroundColor} />

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

      case 'TERM_P': {
        return (
          <MaybeFirst circuitName={circuitName} ref={ref}>
            <Thermostat network={network} backgroundColor={backgroundColor} />

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

      case 'BATT': {
        return (
          <MaybeFirst circuitName={circuitName} ref={ref}>
            <Battery network={network} backgroundColor={backgroundColor} />

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

      case 'INSTR': {
        return (
          <MaybeFirst circuitName={circuitName} ref={ref}>
            <Instrument network={network} backgroundColor={backgroundColor} />

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

      case 'TRA_1F': {
        return (
          <MaybeFirst circuitName={circuitName} ref={ref}>
            <Transformer network={network} backgroundColor={backgroundColor} />

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

      case 'UNKNOWN': {
        return (
          <MaybeFirst circuitName={circuitName} ref={ref}>
            <Unknown network={network} backgroundColor={backgroundColor} />

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
              <StyledDefaultComponent>{network.name}</StyledDefaultComponent>

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
