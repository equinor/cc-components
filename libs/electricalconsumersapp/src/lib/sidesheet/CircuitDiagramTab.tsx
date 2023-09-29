import { CircuitDiagram, ElectricalNetwork } from '@cc-components/shared';

type CircuitDiagramTabProps = {
  elenetwork?: ElectricalNetwork | null;
  itemId: string;
};
export const CircuitDiagramTab = ({ elenetwork, itemId }: CircuitDiagramTabProps) => {
  if (elenetwork === null) {
    return <div>No elenetwork found</div>;
  }
  return (
    <CircuitDiagram
      network={elenetwork}
      isLoading={elenetwork === undefined}
      itemId={itemId}
    />
  );
};
