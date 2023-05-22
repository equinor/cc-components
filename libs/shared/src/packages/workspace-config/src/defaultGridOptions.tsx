import { GridOptions } from '@equinor/workspace-ag-grid';
import { memo } from 'react';
import styled from 'styled-components';
import { defaultColDef } from './defaultColDef';

export const SkeletonPackage = styled.div<{ height: number; width: number }>`
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
  margin-left: 20px;
  cursor: progress;
  background: linear-gradient(0.25turn, transparent, #fff, transparent),
    linear-gradient(#eee, #eee);
  background-repeat: no-repeat;
  background-size: 315px 250px, 315px 180px, 100px 100px, 225px 30px;
  background-position: -315px 0, 0 0, 0px 190px, 50px 195px;
  border-radius: 5px;
  animation: loading 1.5s infinite;
  @keyframes loading {
    to {
      background-position: 315px 0, 0 0, 0 190px, 50px 195px;
    }
  }
`;

const LoadingCellRenderer = memo(() => {
  return <SkeletonPackage height={20} width={100} />;
});

export const defaultGridOptions: GridOptions = {
  loadingCellRenderer: LoadingCellRenderer,
  defaultColDef: defaultColDef,
  serverSideInitialRowCount: 100,
  onFirstDataRendered: (e) => {
    e.columnApi.autoSizeColumns(e.columnApi.getAllDisplayedColumns());
  },
};
