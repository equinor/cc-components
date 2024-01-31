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

  /*
  const { width, setWidth } = useResizeContext();
  const reszied = useRef({ hasResized: false, id: ht.heatTraceCableId });

  if (reszied.current.id !== ht.heatTraceCableId) {
    reszied.current = { hasResized: false, id: ht.heatTraceCableId };
    setWidth(700);
  }
  */

  const diagrams = networks?.map((network) => (
    <CircuitDiagram network={network} isLoading={isFetching} itemNo={itemNo} />
  ));

  return (
    <StyledContentWrapper>
      {isFetching ? <CircuitDiagram isLoading={isFetching} itemNo={itemNo} /> : null}
      {diagrams}
    </StyledContentWrapper>
  );
};
