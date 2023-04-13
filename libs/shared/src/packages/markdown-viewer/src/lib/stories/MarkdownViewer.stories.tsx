import { MarkdownViewer } from '../index';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';
export default {
  title: 'Markdown viewer',
  component: MarkdownViewer,
} as ComponentMeta<typeof MarkdownViewer>;

const Template: ComponentStory<typeof MarkdownViewer> = (args) => (
  <MarkdownViewer {...args} />
);

export const DefaultViewer = Template.bind({});

DefaultViewer.args = {
  children:
    '**This is an example**\n\nThis is an example  \nThis is an example\n\n*   This is an example\n    \n*   This is an example\n    \n*   This is an example  \n    **This is an example**\n    \n\n1.  _This is an example_',
};
