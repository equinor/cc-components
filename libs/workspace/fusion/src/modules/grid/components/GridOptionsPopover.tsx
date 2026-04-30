import { Button, EdsProvider, Icon, Menu, Progress } from '@equinor/eds-core-react';
import { more_vertical } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';
import { GridApi, clearPersistedColumnState } from '@equinor/workspace-ag-grid';
import { CsvExportColumn } from '../../../lib/integrations/grid';
import { useMutation } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import styled from 'styled-components';
import { DumpsterFireDialog } from '../../../lib/components/ErrorComponent';

Icon.add({ more_vertical });

type GridOptionsPopoverProps = {
  anchor: HTMLElement;
  filterState: any;
  excelExport?: (params: any) => Promise<void>;
  csvExport?: (filterState: any, columns: CsvExportColumn[], sort?: { colId: string; descending: boolean }) => Promise<void>;
  storageKey?: string;
  gridApi: GridApi | null;
};
export const GridOptionPopover = ({
  anchor,
  excelExport,
  csvExport,
  filterState,
  storageKey,
  gridApi,
}: GridOptionsPopoverProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const iconRef = useRef<HTMLElement | null>(null);

  const {
    error: excelError,
    isPending: isExcelPending,
    isError: isExcelError,
    mutateAsync: mutateExcel,
  } = useMutation({
    mutationKey: ['exportData'],
    mutationFn: async () => {
      if (!excelExport) {
        console.warn('No Excel export function found');
        return;
      }
      return await excelExport(filterState);
    },
  });

  const {
    error: csvError,
    isPending: isCsvPending,
    isError: isCsvError,
    mutateAsync: mutateCsv,
  } = useMutation({
    mutationKey: ['csvExportData'],
    mutationFn: async () => {
      if (!csvExport || !gridApi) {
        console.warn('No CSV export function or grid API found');
        return;
      }
      const columns: CsvExportColumn[] = gridApi
        .getAllDisplayedColumns()
        .map((col) => ({
          colId: col.getColId(),
          headerName: gridApi.getDisplayNameForColumn(col, 'header') ?? col.getColId(),
        }));
      const sortedCol = gridApi.getColumnState().find((c) => c.sort);
      const sort = sortedCol
        ? { colId: sortedCol.colId!, descending: sortedCol.sort === 'desc' }
        : undefined;
      return await csvExport(filterState, columns, sort);
    },
  });

  const handleExportToExcel = () => {
    mutateExcel();
  };

  const handleExportToCsv = () => {
    mutateCsv();
  };

  const error = excelError || csvError;
  const isError = isExcelError || isCsvError;

  return (
    <>
      <Icon
        name="more_vertical"
        color={tokens.colors.interactive.primary__resting.hex}
        ref={(el) => {
          iconRef.current = el;
          setAnchorEl(el);
        }}
        onClick={() => setIsOpen((s) => !s)}
      />
      <Menu open={isOpen} anchorEl={anchorEl} onClose={() => setIsOpen(false)}>
        <EdsProvider density={'compact'}>
          <Menu.Section title="Grid Options">
            <StyledMenuList>
              {isError && (
                <StyledMenuItem>
                  <DumpsterFireDialog
                    text={
                      typeof error === 'string'
                        ? error
                        : 'We encountered an issue fetching the data. Please try again later.'
                    }
                  />
                </StyledMenuItem>
              )}
              {excelExport && (
                <StyledMenuItem>
                  <FullWidthButton variant="ghost_icon" onClick={!isExcelPending ? handleExportToExcel : undefined}>
                    {isExcelPending ? <Progress.Dots color={'neutral'} /> : 'Export to Excel'}
                  </FullWidthButton>
                </StyledMenuItem>
              )}
              {csvExport && (
                <StyledMenuItem>
                  <FullWidthButton
                    variant="ghost_icon"
                    disabled={!gridApi}
                    onClick={!isCsvPending ? handleExportToCsv : undefined}
                  >
                    {isCsvPending ? <Progress.Dots color={'neutral'} /> : 'Export to CSV'}
                  </FullWidthButton>
                </StyledMenuItem>
              )}
              {storageKey && gridApi && (
                <StyledMenuItem>
                  <FullWidthButton
                    variant="ghost_icon"
                    onClick={() => clearPersistedColumnState(storageKey, gridApi)}
                  >
                    Reset Columns
                  </FullWidthButton>
                </StyledMenuItem>
              )}
            </StyledMenuList>
          </Menu.Section>
        </EdsProvider>
      </Menu>
    </>
  );
};

const FullWidthButton = styled(Button)`
  width: 100%;
  justify-content: center;
  margin: 4px 0;
  &:hover {
    border-radius: 4px;
  }
`;

const StyledMenuList = styled.div`
  max-height: 60vh;
  overflow-y: auto;
`;

const StyledMenuItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 3px 6px;
  gap: 6px;
  width: 100%;
  box-sizing: border-box;
  user-select: none;
`;
