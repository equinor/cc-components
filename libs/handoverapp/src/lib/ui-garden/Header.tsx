import { HandoverPackage } from '@cc-components/handovershared';
import { CustomHeaderView } from '@equinor/workspace-fusion/garden';
import { memo, useMemo } from 'react';
import styled from 'styled-components';
import { getSubtitleHeader } from '../utils-garden';
const HeaderContent = styled.div`
  font-weight: 600;
`;
const HandoverGardenHeader = (props: CustomHeaderView<HandoverPackage>) => {
  const { columnIndex, garden } = props;
  const subHeader = useMemo(
    () => getSubtitleHeader(garden[columnIndex].items, props?.groupByKey),
    [columnIndex, garden, props?.groupByKey]
  );
  return (
    <HeaderContent>
      {garden[columnIndex].value}
      <div>{subHeader}</div>
    </HeaderContent>
  );
};

export const GardenHeader = memo(HandoverGardenHeader);
