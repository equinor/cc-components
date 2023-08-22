import Workspace from '@equinor/workspace-fusion';
import { gridModule } from '@equinor/workspace-fusion/grid-module';
import { defaultGridOptions } from '@cc-components/shared/workspace-config';
import data from '../../osd.json' assert { type: 'json' };
import {
  ColDef,
  GridConfig,
  ICellRendererProps,
  MenuModule,
  ColumnsToolPanelModule,
} from '@equinor/workspace-fusion/grid';
import { ElectricalSidesheet } from '../sidesheet/EleconsumerSidesheet';

export type Electrical = {
  instcode: string;
  consumer: string;
  tagcategory: number;
  tagtype: string;
  compnameeng: string;
  locationcode: string;
  description: string;
  systemno: string;
  disciplinecode: string;
  projectcode: string;
  contrcode: string;
  pono: string;
  tagstatus: string;
  inserteddate: string;
  updateddate: string;
  swbboard: string;
  cubicleid: string;
  circuittagno: string;
  circtype: string;
};

const electricals = data as unknown as Electrical[];

export const WorkspaceWrapper = () => {
  return (
    <Workspace
      workspaceOptions={{
        getIdentifier: (t) => Math.random().toString(),
      }}
      gridOptions={{
        columnDefinitions: [
          {
            field: 'instCode',
          },
          {
            field: 'consumer',
          },
          {
            field: 'tagcategory',
          },
          {
            field: 'compnameeng',
          },
          {
            field: 'locationcode',
          },
          {
            field: 'description',
          },
          {
            field: 'systemno',
          },
          {
            field: 'disciplinecode',
          },
          //projectCode
          {
            field: 'contrcode',
          },
          {
            field: 'swbboard',
          },
          {
            field: 'circuittagno',
          },

          {
            field: 'tagtype',
            initialHide: true,
          },
          {
            field: 'pono',
            initialHide: true,
          },
          {
            field: 'cubicleid',
            initialHide: true,
          },
          {
            field: 'circtype',
            initialHide: true,
          },
        ],
        gridOptions: { ...defaultGridOptions },

        getRows: async (params) => {
          params.success({ rowData: electricals.slice(params.request.startRow, params.request.endRow), rowCount: electricals.length });
        },
        modules: [ColumnsToolPanelModule, MenuModule],
      }}
      statusBarOptions={async (e) => {
        return [{title: "total", value: electricals.length}]
      }}
      sidesheetOptions={{
        type: 'default',
        DetailsSidesheet: (props) => <ElectricalSidesheet.Component close={props.close} id={props.id} item={props.item} />,
      }}
      modules={[gridModule]}
    />
  );
};
