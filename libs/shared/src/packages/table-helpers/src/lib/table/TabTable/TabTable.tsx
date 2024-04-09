import { Icon, Progress } from '@equinor/eds-core-react';
import { info_circle, error_outlined } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';
import { ColDef, ClientGrid, GridOptions } from '@equinor/workspace-ag-grid';
import { InfoText, NoResourceData } from './tabTable.styles';
import { defaultGridOptions } from '../../../../../workspace-config/src/defaultGridOptions';

type TabTableProps<T> = {
  packages: T[] | undefined;
  columns: ColDef<T>[];
  isFetching: boolean;
  error: Error | null;
  resourceName: string;
  height?: number;
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
  const { columns, error, isFetching, packages, resourceName, height } = props;

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
    <ClientGrid
      rowData={packages}
      colDefs={columns}
      height={height || 500}
      gridOptions={{ ...defaultGridOptions, ...props.additionalGridOptions }}
    />
  );
};
