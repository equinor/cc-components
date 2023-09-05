import styled from 'styled-components';
import { ElectricalNetwork } from '../config/ElectricalSidesheet';
import { tokens } from '@equinor/eds-tokens';
import { useState } from 'react';

export function CircuitDiagram({ network }: { network: ElectricalNetwork }) {
  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        overflow: 'auto',
        fontSize: '12px',
      }}
    >
      <Switchboard network={network} />
      <Wrapper
        style={{
          gridTemplateRows: new Array(network.children.length).fill('1fr').join(' '),
        }}
      >
        {network.children
          .map((s) => s.children)
          .flat()
          .map((s) => (
            <ItemStuffThing network={s} key={s.name} />
          ))}
      </Wrapper>
    </div>
  );
}

function Switchboard({ network }: { network: ElectricalNetwork }) {
  return (
    <div
      style={{
        background: tokens.colors.ui.background__light.hex,
        border: `1px solid ${tokens.colors.ui.background__medium.hex}`,
        width: '110px',
        display: 'flex',
        alignItems: 'flex-start',
        flexDirection: 'column',
        gap: '50px',
        padding: '10px 5px 0px 5px',
        borderRadius: '10px',
      }}
    >
      <div>{network.name}</div>
      <div>
        {network.children.map((s) => (
          <div
            key={s.name}
            style={{ display: 'flex', whiteSpace: 'nowrap', width: 'fit-content' }}
          >
            {s.name}
            {s.isSafetyCritical ? <CriticalLineVisual /> : null}
          </div>
        ))}
      </div>
    </div>
  );
}

const StyledHTCable = styled.div`
  display: flex;
  gap: 1ch;
  padding-left: 10px;
  border-bottom: 2px dashed rgb(61, 61, 61);
  width: fit-content;
  white-space: nowrap;
  ::after {
    width: 12px;
    height: 12px;
    border: 1px solid white;
    background-color: ${(props) => 'black'};
    border-radius: 50%;
    margin: 0px 1px;
    content: ' ';
    position: relative;
    left: 1ch;
    top: 1.5ch;
  }
`;

const StyledJunctionBox = styled.div`
  display: flex;
  box-sizing: border-box;
  min-height: 60px;
  white-space: nowrap;
  padding: 10px 5px 0px 5px;
  border: 1px solid ${tokens.colors.ui.background__medium.hex};
  /* border: 1px solid black; */
  border-radius: 10px;
`;

function JunctionBox({ network }: { network: ElectricalNetwork }) {
  return <StyledJunctionBox>{network.name}</StyledJunctionBox>;
}

export const HTCable = ({ network }: { network: ElectricalNetwork }) => {
  return (
    <>
      <StyledHTCable>
        {network.name} {network.isSafetyCritical ? <CriticalLineVisual /> : null}
      </StyledHTCable>
    </>
  );
};

function ItemStuffThing({ network }: { network: ElectricalNetwork }) {
  switch (network.eleSymbolCode) {
    case 'HT_KAB': {
      return <HTCable network={network} />;
    }

    case 'KABEL': {
      return (
        <Item>
          <Cable name={network.name} />

          <ChildWrapper>
            {network.children.map((s) => (
              <ItemStuffThing network={s} key={s.name} />
            ))}
          </ChildWrapper>
        </Item>
      );
    }

    case 'KURS': {
      return (
        <Item>
          <Name>{network.name}</Name>

          <ChildWrapper>
            {network.children.map((s) => (
              <ItemStuffThing network={s} key={s.name} />
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
              <ItemStuffThing network={s} key={s.name} />
            ))}
          </ChildWrapper>
        </Item>
      );
    }

    case 'TAVLE': {
      return (
        <Item>
          <Name>{network.name}</Name>

          <ChildWrapper>
            {network.children.map((s) => (
              <ItemStuffThing network={s} key={s.name} />
            ))}
          </ChildWrapper>
        </Item>
      );
    }

    case 'VARME': {
      return (
        <Item>
          <StyledSpaceHeater>{network.name}</StyledSpaceHeater>

          <ChildWrapper>
            {network.children.map((s) => (
              <ItemStuffThing network={s} key={s.name} />
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
              <ItemStuffThing network={s} key={s.name} />
            ))}
          </ChildWrapper>
        </Item>
      );
  }
}

function Cable({ name }: { name: string }) {
  return (
    <div
      style={{
        borderBottom: '1px solid black',
        height: '5ch',
        whiteSpace: 'nowrap',
        padding: '0px 10px',
      }}
    >
      {name}
    </div>
  );
}

const CriticalLineVisual = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return (
    <>
      <TestDotWrapper onMouseOver={onOpen} onMouseLeave={onClose}>
        <CriticalLineVisualStyle>
          <TestDotCircleText>CL</TestDotCircleText>
          {isOpen && (
            <div>
              <CircuitDiagramPopover>{'Heating Critical Line'}</CircuitDiagramPopover>
            </div>
          )}
        </CriticalLineVisualStyle>
      </TestDotWrapper>
    </>
  );
};

const TestDotWrapper = styled.span`
  display: flex;
  flex-direction: horizontal;
  flex: 1;
  justify-content: center;
  padding-bottom: 3px;
`;

const CriticalLineVisualStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  width: 30px;
  height: 14px;
  margin-right: 2px;
  color: ${tokens.colors.interactive.danger__resting.hex};
  background-color: ${tokens.colors.ui.background__light.hex};
  border: 1px solid;
  border-color: ${tokens.colors.interactive.danger__resting.hex};
  margin-left: 8px;
`;

export const TestDotCircleText = styled.div`
  font-size: 16px;
  font-weight: 400, regular;
  cursor: default;
`;

const CircuitDiagramPopover = styled.div<{ cornerButton?: boolean }>`
  position: absolute;
  z-index: 100;
  color: #fff;
  background-color: #121212;
  padding: 5px 5px;
  border-radius: 4px;
  margin-top: ${(p) => (p.cornerButton ? '40px' : '10px')};
  right: ${(p) => (p.cornerButton ? '0px' : null)};
`;

const Wrapper = styled.div`
  display: grid;
  gap: 2em;
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
  display: flex;
  width: fit-content;
  border: 1px solid ${tokens.colors.ui.background__medium.hex};
  border-radius: 10px;
  padding: 10px 5px 0px 5px;
  min-height: 60px;
  box-sizing: border-box;
  white-space: nowrap;
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
