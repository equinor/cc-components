import styled from 'styled-components';
import { ElectricalNetwork } from '../config/ElectricalSidesheet';
import { tokens } from '@equinor/eds-tokens';

export function CircuitDiagram({ network }: { network: ElectricalNetwork }) {
  return (
    <div style={{ display: 'flex', width: '100%', overflow: 'auto' }}>
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
        padding: '10px 5px 0px 5px',
      }}
    >
      <div>{network.name}</div>
      <div>
        {network.children.map((s) => (
          <div key={s.name}>{s.name}</div>
        ))}
      </div>
    </div>
  );
}

const StyledHTCable = styled.div`
  display: flex;
  gap: 1ch;
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
  flex: 1 1 0%;
  width: 60px;
  box-sizing: border-box;
  min-height: 60px;
  border: 1px solid ${tokens.colors.ui.background__light.hex};
`;

function JunctionBox({ network }: { network: ElectricalNetwork }) {
  return <StyledJunctionBox>{network.name}</StyledJunctionBox>;
}

export const HTCable = ({ network }: { network: ElectricalNetwork }) => {
  return <StyledHTCable>{network.name}</StyledHTCable>;
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
  }
}

function Cable({ name }: { name: string }) {
  return (
    <div style={{ borderBottom: '1px solid black', height: '3ch', whiteSpace: 'nowrap' }}>
      {name}
    </div>
  );
}

const Wrapper = styled.div`
  display: grid;
`;

const Item = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  min-width: 200px;
  max-width: 1000px;
`;

const Name = styled.div`
  border: 2px solid black;
  height: 100%;
  min-width: 75px;
`;

const ChildWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1em;
`;
