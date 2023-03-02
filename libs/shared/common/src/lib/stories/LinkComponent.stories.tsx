import { ComponentMeta, ComponentStory } from '@storybook/react';
import { StyledItemLink } from '../common.styles';
export default {
  title: 'Link component',
  component: StyledItemLink,
} as ComponentMeta<typeof StyledItemLink>;

const Template: ComponentStory<typeof StyledItemLink> = (args) => (
  <StyledItemLink {...args}>A link</StyledItemLink>
);

export const Link = Template.bind({});

Link.args = {
  href: 'https://www.example.com',
  target: '_blank',
};
