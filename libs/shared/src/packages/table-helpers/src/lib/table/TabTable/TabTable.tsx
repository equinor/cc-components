import { Icon, Progress } from '@equinor/eds-core-react';
import { info_circle, error_outlined } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';
import { ColDef, ClientGrid, GridOptions } from '@equinor/workspace-ag-grid';
import { InfoText, NoResourceData } from './tabTable.styles';
import { defaultGridOptions } from '../../../../../workspace-config/src/defaultGridOptions';
import { useRef } from 'react';
import { useResizeObserver } from '../../../../../hooks/src/lib/useResizeObserver';


type TabTableProps<T> = {
  packages: T[] | undefined;
  columns: ColDef<T>[];
  isFetching: boolean;
  error: Error | null;
  resourceName: string;
  additionalGridOptions?: GridOptions;
};

Icon.add({ info_circle, error_outlined });

/**
 * Standard Table component using `ReactGrid` from workspace-ag-grid.
 * Use this if you need a table in a sidesheet tab.
 */
export const TabTable = <T extends Record<PropertyKey, unknown>>(
  props: TabTableProps<T>
): JSX.Element => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [_, refHeight] = useResizeObserver(ref);
  const { columns, error, isFetching, packages, resourceName } = props;

  const refMinHeight = refHeight < 50 ? 500 : refHeight;

  const gridHeight = packages && packages.length > 30 ? refMinHeight : "auto-height"

  if (isFetching) {
    return (
      <NoResourceData>
        <Progress.Circular />
        <InfoText>{`Fetching ${resourceName}`}</InfoText>
      </NoResourceData>
    );
  }

  if (error) {
    return (
      <NoResourceData>
        <Icon
          name="error_outlined"
          size={40}
          color={tokens.colors.interactive.primary__resting.hsla}
        />
        <InfoText>{`Failed to load ${resourceName}`}</InfoText>
      </NoResourceData>
    );
  }

  if (packages === undefined || packages.length === 0) {
    return (
      <NoResourceData>
        <Icon
          name="info_circle"
          size={40}
          color={tokens.colors.interactive.primary__resting.hsla}
        />
        <InfoText>{`No ${resourceName}`}</InfoText>
      </NoResourceData>
    );
  }

  return (
    <div ref={ref} style={{ height: "100%", width: "100%" }}>
      <ClientGrid
        rowData={packages}
        colDefs={columns}
        height={typeof (gridHeight) === "number" ? gridHeight : 500}
        gridOptions={{ ...defaultGridOptions, ...props.additionalGridOptions, domLayout: gridHeight === "auto-height" ? "autoHeight" : undefined }}
      />
    </div>
  );
};
