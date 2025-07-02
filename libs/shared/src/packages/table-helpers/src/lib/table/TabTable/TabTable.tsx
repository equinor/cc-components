import { Icon, Progress } from '@equinor/eds-core-react';
import { error_outlined, info_circle } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';
import { ClientGrid, ColDef, GridOptions } from '@equinor/workspace-ag-grid';
import { defaultGridOptions } from '../../../../../workspace-config/src/defaultGridOptions';
import { InfoText, NoResourceData, TabTableStyles } from './tabTable.styles';

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
  const { columns, error, isFetching, packages, resourceName } = props;

  return (
    <TabTableStyles style={{ width: '100%' }}>
      {isFetching && (
        <NoResourceData>
          <Progress.Circular />
          <InfoText>{`Fetching ${resourceName}`}</InfoText>
        </NoResourceData>
      )}

      {error && (
        <NoResourceData>
          <Icon
            name="error_outlined"
            size={40}
            color={tokens.colors.interactive.primary__resting.hsla}
          />
          <InfoText>{`Failed to load ${resourceName}`}</InfoText>
        </NoResourceData>
      )}

      {!isFetching && packages && packages.length === 0 && (
        <NoResourceData>
          <Icon
            name="info_circle"
            size={40}
            color={tokens.colors.interactive.primary__resting.hsla}
          />
          <InfoText>{`No ${resourceName}`}</InfoText>
        </NoResourceData>
      )}

      {packages && packages.length > 0 && (
        <ClientGrid
          rowData={packages}
          colDefs={columns}
          gridOptions={{
            ...defaultGridOptions,
            ...props.additionalGridOptions,
            domLayout: 'autoHeight',
          }}
        />
      )}
    </TabTableStyles>
  );
};
