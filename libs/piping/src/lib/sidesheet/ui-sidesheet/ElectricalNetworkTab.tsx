import { CircuitDiagram, ElectricalNetwork } from '@cc-components/shared';
import { StyledContentWrapper } from '@cc-components/sharedcomponents';
import { Icon } from '@equinor/eds-core-react';
import { InfoText, NoResourceData } from './electricalNetworkTab.styles';
import { tokens } from '@equinor/eds-tokens';
import { ReactElement } from 'react';

type ElectricalNetworkTab = {
  networks: ElectricalNetwork[] | undefined;
  itemNo: string;
  isFetching: boolean;
  error: Error | null;
};

export const ElecticalNetworkTab = (props: ElectricalNetworkTab): ReactElement => {
  const { networks, isFetching, itemNo } = props;

  if (isFetching) {
    return <CircuitDiagram isLoading={isFetching} itemNo={itemNo} />;
  }

  if (!networks || networks.length < 1) {
    return (
      <NoResourceData>
        <Icon
          name="info_circle"
          size={40}
          color={tokens.colors.interactive.primary__resting.hsla}
        />
        <InfoText>No Circuit Diagram found</InfoText>
      </NoResourceData>
    );
  }

  const diagrams = networks.map((network) => (
    <CircuitDiagram network={network} isLoading={isFetching} itemNo={itemNo} />
  ));

  return <StyledContentWrapper>{diagrams}</StyledContentWrapper>;
};
