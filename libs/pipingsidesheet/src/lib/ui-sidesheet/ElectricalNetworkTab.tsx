import { CircuitDiagram, ElectricalNetwork } from '@cc-components/shared';
import { StyledContentWrapper } from '@cc-components/sharedcomponents';

type ElectricalNetworkTab = {
  networks: ElectricalNetwork[] | undefined;
  itemNo: string;
  isFetching: boolean;
  error: Error | null;
};

export const ElecticalNetworkTab = (props: ElectricalNetworkTab): JSX.Element => {
  const { networks, isFetching, itemNo } = props;

  if (!networks || networks.length < 1) {
    return <div>No Circuit Diagram found</div>;
  }

  const diagrams = networks.map((network) => (
    <CircuitDiagram network={network} isLoading={isFetching} itemNo={itemNo} />
  ));

  return (
    <StyledContentWrapper>
      {isFetching ? <CircuitDiagram isLoading={isFetching} itemNo={itemNo} /> : null}
      {diagrams}
    </StyledContentWrapper>
  );
};
