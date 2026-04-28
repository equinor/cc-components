import { Button, Icon, Popover, Progress } from '@equinor/eds-core-react';
import { close, more_vertical } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';
import { GridApi, clearPersistedColumnState } from '@equinor/workspace-ag-grid';
import { CsvExportColumn } from '../../../lib/integrations/grid';
import { useMutation } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { DumpsterFireDialog } from '../../../lib/components/ErrorComponent';

Icon.add({ close, more_vertical });

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
  const pRef = useRef(null);
  const popoverRef = useRef<HTMLDivElement | null>(null);

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
        ref={pRef}
        onClick={() => setIsOpen((s) => !s)}
      />
      {createPortal(
        <Popover ref={popoverRef} open={isOpen} anchorEl={pRef.current}>
          <Popover.Header>
            <StyledPopoverHeaderLine>
              <Popover.Title>Grid Options</Popover.Title>
              <Icon
                name="close"
                color={tokens.colors.interactive.primary__resting.hex}
                onClick={() => setIsOpen(false)}
              />
            </StyledPopoverHeaderLine>
          </Popover.Header>
          <Popover.Content style={{ overflow: 'hidden' }}>
            <ButtonContainer>
              {isError && (
                <DumpsterFireDialog
                  text={
                    typeof error === 'string'
                      ? error
                      : 'We encountered an issue fetching the data. Please try again later.'
                  }
                />
              )}
              {excelExport && (
                <ButtonButton
                  disabled={excelExport == undefined}
                  style={{ width: '130px', padding: '0px' }}
                  onClick={!isExcelPending ? handleExportToExcel : undefined}
                >
                  {isExcelPending ? <Progress.Dots color={'neutral'} /> : 'Export to Excel'}
                </ButtonButton>
              )}
              {csvExport && (
                <ButtonButton
                  disabled={!gridApi}
                  style={{ width: '130px', padding: '0px' }}
                  onClick={!isCsvPending ? handleExportToCsv : undefined}
                >
                  {isCsvPending ? <Progress.Dots color={'neutral'} /> : 'Export to CSV'}
                </ButtonButton>
              )}
              {storageKey && gridApi && (
                <ButtonButton
                  style={{ width: '130px', padding: '0px' }}
                  onClick={() => clearPersistedColumnState(storageKey, gridApi)}
                >
                  Reset columns
                </ButtonButton>
              )}
            </ButtonContainer>
          </Popover.Content>
        </Popover>,
        anchor
      )}
    </>
  );
};

const StyledPopoverHeaderLine = styled.div`
  display: flex;
  width: 268px;
  justify-content: space-between;
  align-items: center;
`;

const ButtonButton = styled(Button)`
  & *:first-child {
    padding-top: 0px;
    padding-bottom: 0px;
  }
  padding: 0px;
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledLoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 1em;
  width: 268px;
  justify-content: center;
`;
