import { Icon, Progress } from '@equinor/eds-core-react';
import { info_circle } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';
import { ColDef, ReactGrid } from '@equinor/workspace-ag-grid';
import { InfoText, NoResourceData } from './tabTable.styles';
import { defaultColDef } from '../../../../../workspace-config/src/defaultColDef';

type TabTableProps<T> = {
  packages: T[] | undefined;
  columns: ColDef<T>[];
  isFetching: boolean;
  error: Error | null;
  resourceName: string;
  height?: number;
};

Icon.add({ info_circle });

/**
 * Standard Table component using `ReactGrid` from workspace-ag-grid.
 * Use this if you need a table in a sidesheet tab.
 */
export const TabTable = <T extends Record<PropertyKey, unknown>>(
  props: TabTableProps<T>
): JSX.Element => {
  const { columns, error, isFetching, packages, resourceName, height } = props;
  if (isFetching) {
    <NoResourceData>
      <Progress.Circular />
      <InfoText>{`Fetching ${resourceName}`}</InfoText>
    </NoResourceData>;
  }

  if (error || packages === undefined || packages.length === 0) {
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
    <ReactGrid
      rowData={packages}
      gridOptions={{ defaultColDef }}
      colDefs={columns}
      height={height || 500}
    />
  );
};
