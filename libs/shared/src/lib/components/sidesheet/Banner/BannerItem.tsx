import { BannerItemTitle, BannerItemValue } from './banner.styles';

type BannerItemProps = {
  title: string;
  value: string | number | JSX.Element;
};

export const BannerItem = ({ title, value }: BannerItemProps): JSX.Element => {
  return (
    <div>
      <BannerItemTitle>{title}</BannerItemTitle>
      <BannerItemValue>{value}</BannerItemValue>
    </div>
  );
};
