import { MarkdownEditor, OnChangeHelper } from '../index';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';
export default {
  title: 'Markdown editor',
  component: MarkdownEditor,
} as ComponentMeta<typeof MarkdownEditor>;

const Template: ComponentStory<typeof MarkdownEditor> = (args) => (
  <MarkdownEditor {...args} />
);

export const DefaultEditor = Template.bind({});

DefaultEditor.args = {
  placeholder: 'Please enter a description',
};
const TemplateTwo: ComponentStory<typeof MarkdownEditor> = (args) => {
  const [value, setValue] = useState({
    description: 'This editor will extract the input value and convert it into markdown',
  });
  return (
    <>
      <MarkdownEditor {...args}>
        <OnChangeHelper onChange={(v: string) => setValue({ description: v })} />
      </MarkdownEditor>
      <pre>Markdown state: {JSON.stringify(value)}</pre>
    </>
  );
};
export const EditorWithMarkdown = TemplateTwo.bind({});
