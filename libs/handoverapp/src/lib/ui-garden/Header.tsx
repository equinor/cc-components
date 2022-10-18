/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck //TODO Remove when  type is ready
import { memo, useMemo } from 'react';
import styled from 'styled-components';
import { HandoverPackage } from '../types';
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

export default memo(HandoverGardenHeader);
