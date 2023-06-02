import { CustomGroupView } from '@equinor/workspace-fusion/garden';
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
import { SoftwareChangeRecord } from '@cc-components/swcrshared';

export const ChevronUp = (): JSX.Element => (
  <Icon name={'chevron_up'} color={tokens.colors.interactive.primary__resting.rgba} />
);

export const ChevronDown = (): JSX.Element => (
  <Icon name={'chevron_down'} color={tokens.colors.interactive.primary__resting.rgba} />
);

export const ChevronRight = (): JSX.Element => (
  <Icon name={'chevron_right'} color={tokens.colors.interactive.primary__resting.rgba} />
);

const SwcrGrouped = (props: CustomGroupView<SoftwareChangeRecord>) => {
  const { data, onClick } = props;

  return <div>todo:</div>;
  // return (
  //   <StyledSwcrGroup key={data.columnName} onClick={onClick}>
  //     {/* {data.status?.statusElement} */}
  //     <StyledGroupText>
  //       <StyledGroupedTitle>{data.columnName}</StyledGroupedTitle>
  //       <StyledCount>({data.totalItemsCount})</StyledCount>
  //     </StyledGroupText>
  //     <StyledChevron>{data.isExpanded ? <ChevronUp /> : <ChevronDown />}</StyledChevron>
  //   </StyledSwcrGroup>
  // );
};

export const GardenGrouped = memo(SwcrGrouped);
