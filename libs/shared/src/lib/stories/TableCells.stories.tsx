import { ColDef, ICellRendererProps } from '@equinor/workspace-ag-grid';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import {
  TabTable,
  DescriptionCell as DCell,
  YearAndWeekCell as YWCell,
  StatusCell as SCell,
} from '../components';
import { statusColorMap } from '../mapping';
import { BaseStatus } from '../types';
export default {
  title: 'Table Cells',
  component: TabTable,
} as ComponentMeta<typeof TabTable>;
const data = [
  {
    description:
      'A very long description with a popover of the whole string and ellipsis if it overflows the column length',
    createdAt: '01/02/2023',
    status: 'OK',
  },
];
const Template: ComponentStory<typeof TabTable> = (args) => (
  <TabTable
    {...args}
    isFetching={false}
    resourceName="Storybook Table"
    packages={data}
    error={null}
  />
);

export const DescriptionCell = Template.bind({});

const cols: ColDef[] = [
  {
    field: 'description',
    cellRenderer: (props: ICellRendererProps) => {
      return <DCell description={props.value} />;
    },
  },
];

DescriptionCell.args = {
  columns: cols,
};

export const YearAndWeekCell = Template.bind({});
const yearAndWeekCols: ColDef[] = [
  {
    field: 'createdAt',
    cellRenderer: (props: ICellRendererProps) => {
      return <YWCell dateString={props.value} />;
    },
  },
];
YearAndWeekCell.args = {
  columns: yearAndWeekCols,
};

export const StatusCell = Template.bind({});
const statusCellCols: ColDef[] = [
  {
    field: 'status',
    cellRenderer: (props: ICellRendererProps) => {
      return (
        <SCell
          content={props.value}
          cellAttributeFn={() => ({
            style: { backgroundColor: statusColorMap[props.value as BaseStatus] },
          })}
        />
      );
    },
  },
];
StatusCell.args = {
  columns: statusCellCols,
};
