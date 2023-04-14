import { ComponentMeta, ComponentStory } from '@storybook/react';
import { StatusSquare } from '../StatusSquare';
import React from 'react';
import { statusColorMap } from '../../../../mapping';

export default {
  title: 'Status square',
  component: StatusSquare,
} as ComponentMeta<typeof StatusSquare>;

const Template: ComponentStory<typeof StatusSquare> = (args) => (
  <StatusSquare {...args} />
);

export const OK = Template.bind({});
OK.args = {
  statusColor: statusColorMap.OK,
  content: 'OK',
};
export const OS = Template.bind({});
OS.args = {
  statusColor: statusColorMap.OS,
  content: 'OS',
};
export const PA = Template.bind({});
PA.args = {
  statusColor: statusColorMap.PA,
  content: 'PA',
};
export const PB = Template.bind({});
PB.args = {
  statusColor: statusColorMap.PB,
  content: 'PB',
};
