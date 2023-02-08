import { ComponentMeta, ComponentStory } from '@storybook/react';
import { statusColorMap } from '..';
import { BannerItem, StatusCircle, StyledBanner, StyledItemLink } from '../components';
export default {
  title: 'Banner component',
  component: BannerItem,
} as ComponentMeta<typeof BannerItem>;

const Template: ComponentStory<typeof BannerItem> = (args) => <BannerItem {...args} />;

export const NormalBannerItem = Template.bind({});

NormalBannerItem.args = {
  title: 'Banner item title',
  value: 'Value',
};

const TemplateTwo: ComponentStory<typeof StyledBanner> = (args) => (
  <StyledBanner>
    <BannerItem
      title="MC Status"
      value={<StatusCircle content="OS" statusColor={statusColorMap.OS} />}
    />
    <BannerItem
      title="MC pkg"
      value={<StyledItemLink href="https://example.com">12344</StyledItemLink>}
    />
  </StyledBanner>
);

export const CombinedBanners = TemplateTwo.bind({});
