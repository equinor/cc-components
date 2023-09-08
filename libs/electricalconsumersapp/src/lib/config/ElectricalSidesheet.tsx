import { createWidget } from '@equinor/workspace-sidesheet';
import { ElectricalConsumer } from './workspaceConfig';
import { useContextId, useHttpClient, CircuitDiagram } from '@cc-components/shared';
import { useQuery } from '@tanstack/react-query';

export const ElectricalSidesheet = createWidget<{
  close: VoidFunction;
  item?: ElectricalConsumer;
  id: string;
}>((props) => {
  if (!props.props.item) {
    return <div onClick={props.props.close}>uh oh </div>;
  }
  return <Test item={props.props.item!} />;
});

export function Test({ item }: { item: ElectricalConsumer }) {
  const client = useHttpClient();
  const context = useContextId();

  const {
    data: elenetwork,
    isLoading,
    error,
  } = useQuery<ElectricalNetwork>(
    /** facility*/ [item.tagNo, item.instCode],
    async ({ signal }) => {
      const res = await client.fetch(
        `api/contexts/${context}/electrical/consumers/electrical-network/${encodeURIComponent(
          item.tagNo
        )}/${item.instCode}`,
        { signal }
      );
      if (!res.ok) {
        throw new Error('Failed to fetch elenetwork');
      }
      return res.json();
    }
  );

  if (isLoading) return <p>please wait, we're busy</p>;

  if (error || !elenetwork) {
    return <div>uhoh</div>;
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        margin: '20px',
      }}
    >
      <CircuitDiagram network={elenetwork} />
    </div>
  );
}

export type ElectricalNetwork = {
  eleSymbolCode:
    | 'K_BOX'
    | 'HT_KAB'
    | 'KURS'
    | 'TAVLE'
    | 'KABEL'
    | 'VARME'
    | ({} & string);
  type: string;
  name: string;
  urlPath: string;
  busId: string | null;
  tagNoSwb: string | null;
  cubicleId: string | null;
  drawerId: string | null;
  status: string | null;
  tagStatus: string;
  description: string | null;
  hasChildren: boolean;
  isHighlighted: boolean;
  isSafetyCritical: boolean;
  fuseSize: string | null;
  locationCode: string | null;
  phases: string | null;
  htrcTypeCode: string | null;
  installedLength: string | null;
  cableSize: string | null;
  eleNetId: ElenetId | null;
  tags: Tag[];
  children: ElectricalNetwork[];
};

export interface ElenetId {
  instCode: string;
  tagNo: string;
  cubicleId: string;
  drawerId: string | null;
  branchId: number;
}

export type Tag = {
  tagNo: string;
  urlPath: string;
  tagStatus: string;
  cableSize: any;
  cableType: any;
  cableCode: any;
  cableLengthInst: any;
  isHighlighted: boolean;
  isSafetyCritical: boolean;
};
