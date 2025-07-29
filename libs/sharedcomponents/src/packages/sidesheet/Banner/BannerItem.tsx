import { ReactElement } from 'react';
import { BannerItemTitle, BannerItemValue } from './banner.styles';

type BannerItemProps = {
  title: string;
  value: string | number | ReactElement;
};
/**
 * Standard component for displaying a banner item in a sidesheet.
 * Use this within the `StyledBanner` component.
 */
export const BannerItem = ({ title, value }: BannerItemProps): ReactElement => {
  return (
    <div>
      <BannerItemTitle>{title}</BannerItemTitle>
      <BannerItemValue>{value}</BannerItemValue>
    </div>
  );
};
