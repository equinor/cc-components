import { ColDef } from '@equinor/workspace-ag-grid';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { TabTable } from '../components';
export default {
  title: 'Sidesheet table',
  component: TabTable,
} as ComponentMeta<typeof TabTable>;

const Template: ComponentStory<typeof TabTable> = (args) => <TabTable {...args} />;

export const NormalTable = Template.bind({});

const cols: ColDef[] = [
  {
    field: 'id',
  },
  {
    field: 'description',
  },
  {
    field: 'age',
  },
  {
    field: 'location',
  },
];
NormalTable.args = {
  isFetching: false,
  columns: cols,
  error: null,
  height: 500,
  packages: [
    {
      id: '1',
      description: 'Storybook',
      age: '27',
      location: 'Norway',
    },
    {
      id: '2',
      description: 'Storybook',
      age: '42',
      location: 'Sweden',
    },
  ],
  resourceName: 'Storybook Table',
};
