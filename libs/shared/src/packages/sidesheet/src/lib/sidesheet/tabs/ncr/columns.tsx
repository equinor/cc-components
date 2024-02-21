import { ColDef, ICellRendererProps } from '@equinor/workspace-ag-grid';

import { NcrBase } from './types';
import {
  LinkCell,
  DescriptionCell,
  StyledMonospace,
} from '../../../../../../table-helpers';

export const columns: ColDef<NcrBase>[] = [
  {
    headerName: 'Title',
    valueGetter: (pkg) => pkg.data?.title,
    cellRenderer: (props: ICellRendererProps<NcrBase, string | null>) => {
      return (
        <LinkCell
          url={props.data?.url ?? ''}
          urlText={props.value ?? ''}
          tooltipText="Open in Fusion Query"
        />
      );
    },
    minWidth: 250,
    flex: 2,
  },
  {
    headerName: 'Requirement Reference',
    valueGetter: (pkg) => pkg.data?.requirementReference,
    cellRenderer: (props: ICellRendererProps<NcrBase, string | null>) => {
      return <DescriptionCell description={props.value} displayFullText />;
    },
    minWidth: 200,
    flex: 1,
  },
  {
    headerName: 'State',
    valueGetter: (pkg) => pkg.data?.state,
    cellRenderer: (props: ICellRendererProps<NcrBase, string | null>) => {
      return <DescriptionCell description={props.value} displayFullText />;
    },
    minWidth: 100,
    flex: 1,
  },
  {
    headerName: 'Description',
    valueGetter: (pkg) => pkg.data?.description,
    cellRenderer: (props: ICellRendererProps<NcrBase, string | null>) => {
      return <DescriptionCell description={props.value} displayFullText />;
    },
    minWidth: 250,
    flex: 2,
  },
  {
    headerName: 'Proposed Solution',
    valueGetter: (pkg) => pkg.data?.proposedSolution,
    cellRenderer: (props: ICellRendererProps<NcrBase, string | null>) => {
      return <DescriptionCell description={props.value} displayFullText />;
    },
    minWidth: 200,
    flex: 1,
  },
  {
    headerName: 'Initiator Reference',
    valueGetter: (pkg) => pkg.data?.initiatorReference,
    cellRenderer: (props: ICellRendererProps<NcrBase, string | null>) => {
      return <DescriptionCell description={props.value} displayFullText />;
    },
    minWidth: 200,
    flex: 1,
  },
  {
    headerName: 'Current Step',
    valueGetter: (pkg) => pkg.data?.currentStep,
    cellRenderer: (props: ICellRendererProps<NcrBase, string | null>) => {
      return <DescriptionCell description={props.value} displayFullText />;
    },
    minWidth: 150,
    flex: 1,
  },
  {
    headerName: 'Current Step State',
    valueGetter: (pkg) => pkg.data?.currentStepState,
    cellRenderer: (props: ICellRendererProps<NcrBase, string | null>) => {
      return <DescriptionCell description={props.value} displayFullText />;
    },
    minWidth: 150,
    flex: 1,
  },
];
