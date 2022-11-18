import { CustomGroupView } from '@equinor/workspace-fusion/garden';
import { SwcrPackage } from '../types';
import {
  StyledChevron,
  StyledCount,
  StyledGroupedTitle,
  StyledGroupText,
  StyledSwcrGroup,
} from './garden.styles';
import { Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { memo } from 'react';

export const ChevronUp = (): JSX.Element => (
  <Icon name={'chevron_up'} color={tokens.colors.interactive.primary__resting.rgba} />
);

export const ChevronDown = (): JSX.Element => (
  <Icon name={'chevron_down'} color={tokens.colors.interactive.primary__resting.rgba} />
);

export const ChevronRight = (): JSX.Element => (
  <Icon name={'chevron_right'} color={tokens.colors.interactive.primary__resting.rgba} />
);

const SwcrGrouped = (props: CustomGroupView<SwcrPackage>) => {
  const { data, onClick } = props;

  return (
    <StyledSwcrGroup key={data.value + data.groupKey} onClick={onClick}>
      {/* {data.status?.statusElement} */}
      <StyledGroupText>
        <StyledGroupedTitle>{data.value}</StyledGroupedTitle>
        <StyledCount>({data.count})</StyledCount>
      </StyledGroupText>
      <StyledChevron>{data.isExpanded ? <ChevronUp /> : <ChevronDown />}</StyledChevron>
    </StyledSwcrGroup>
  );
};

export const GardenGrouped = memo(SwcrGrouped);
