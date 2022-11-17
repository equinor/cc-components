import { CustomHeaderView } from '@equinor/workspace-fusion/garden';
import { memo } from 'react';
import { SwcrPackage } from '../types';
import { getMinorTitle, getTitle } from '../utils-garden/getHeaderValues';
import { StyledHeaderContainer } from './garden.styles';

const SwcrHeader = (props: CustomHeaderView<SwcrPackage>) => {
  const { columnIndex, garden } = props;
  const column = garden[columnIndex];
  const { groupKey } = column;
  const title = getTitle(groupKey, column);

  return (
    <StyledHeaderContainer>
      <div>{getMinorTitle(groupKey, column)}</div>
      <div>{title}</div>
    </StyledHeaderContainer>
  );
};

export const GardenHeader = memo(SwcrHeader);
