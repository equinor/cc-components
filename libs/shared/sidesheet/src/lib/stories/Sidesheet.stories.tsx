import { ComponentMeta, ComponentStory } from '@storybook/react';
import { BannerItem, StyledBanner } from '../sidesheet';
import { StatusCircle, StyledItemLink } from '@cc-components/shared/common';
import { statusColorMap } from '@cc-components/shared/mapping';

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
      value={<StyledItemLink href="https://example.com">12345</StyledItemLink>}
    />
  </StyledBanner>
);

export const CombinedBanners = TemplateTwo.bind({});
