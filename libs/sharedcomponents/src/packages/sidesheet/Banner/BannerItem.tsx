import { BannerItemTitle, BannerItemValue } from './banner.styles';

type BannerItemProps = {
  title: string;
  value: string | number | JSX.Element;
};
/**
 * Standard component for displaying a banner item in a sidesheet.
 * Use this within the `StyledBanner` component.
 */
export const BannerItem = ({ title, value }: BannerItemProps): JSX.Element => {
  return (
    <div>
      <BannerItemTitle>{title}</BannerItemTitle>
      <BannerItemValue>{value}</BannerItemValue>
    </div>
  );
};
