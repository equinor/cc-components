import { CircuitDiagram, ElectricalNetwork } from '@cc-components/shared';

type CircuitDiagramTabProps = {
  elenetwork?: ElectricalNetwork | null;
};
export const CircuitDiagramTab = ({ elenetwork }: CircuitDiagramTabProps) => {
  if (elenetwork === null) {
    return <div>No elenetwork found</div>;
  }
  return <CircuitDiagram network={elenetwork} isLoading={elenetwork === undefined} />;
};
