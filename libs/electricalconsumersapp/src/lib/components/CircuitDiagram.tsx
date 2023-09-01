import styled from 'styled-components';
import { ElectricalNetwork } from '../config/ElectricalSidesheet';
import { tokens } from '@equinor/eds-tokens';

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
          <div key={s.name}>{s.name}</div>
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
  /* border: 1px solid ${tokens.colors.ui.background__light.hex}; */
  border: 1px solid black;
  border-radius: 10px;
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

    case 'VARME': {
      return (
        <Item>
          <StyledWarm>{network.name}</StyledWarm>

          <ChildWrapper>
            {network.children.map((s) => (
              <ItemStuffThing network={s} key={s.name} />
            ))}
          </ChildWrapper>
        </Item>
      );
    }

    default:
      console.log(network.eleSymbolCode);
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
  border: 1px solid black;
  height: 100%;
  min-width: 75px;
  border-radius: 5px;
`;

const StyledWarm = styled.div`
  border: 1px dashed black;
  height: 100%;
  min-width: 75px;
  border-radius: 5px;
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
