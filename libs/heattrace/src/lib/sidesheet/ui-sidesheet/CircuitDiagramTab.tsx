import { CircuitDiagram, ElectricalNetwork } from '@cc-components/shared';

type CircuitDiagramTabProps = {
  elenetwork?: ElectricalNetwork | null;
  itemNo: string;
  onCircuitDiagramReady?: (element: HTMLDivElement) => void;
};
export const CircuitDiagramTab = ({
  elenetwork,
  itemNo,
  onCircuitDiagramReady,
}: CircuitDiagramTabProps) => {
  if (elenetwork === null) {
    return <div>No elenetwork found</div>;
  }
  return (
    <CircuitDiagram
      network={elenetwork}
      isLoading={elenetwork === undefined}
      itemNo={itemNo}
      onCircuitDiagramReady={onCircuitDiagramReady}
    />
  );
};
