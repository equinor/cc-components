import { CircuitDiagram, ElectricalNetwork } from '@cc-components/shared';

type CircuitDiagramTabProps = {
  elenetwork?: ElectricalNetwork | null;
  itemId: string;
  onCircuitDiagramReady?: (element: HTMLDivElement) => void;
};
export const CircuitDiagramTab = ({
  elenetwork,
  itemId,
  onCircuitDiagramReady,
}: CircuitDiagramTabProps) => {
  if (elenetwork === null) {
    return <div>No elenetwork found</div>;
  }
  return (
    <CircuitDiagram
      network={elenetwork}
      isLoading={elenetwork === undefined}
      itemId={itemId}
      onCircuitDiagramReady={onCircuitDiagramReady}
    />
  );
};
