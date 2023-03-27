import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Modal } from '../index';
export default {
  title: 'Modal component',
  component: Modal,
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => (
  <div>
    <p>Some background text</p>
    <Modal {...args} />
  </div>
);

export const NormalModal = Template.bind({});

NormalModal.args = {
  title: 'Modal title',
  content: <div>Modal goes here</div>,
};
