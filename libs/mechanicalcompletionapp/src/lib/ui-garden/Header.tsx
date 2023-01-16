import { McPackage } from '@cc-components/mechanicalcompletionshared';
import { CustomHeaderView } from '@equinor/workspace-fusion/garden';
import { memo } from 'react';
import { StyledHeaderContainer } from './garden.styles';

export const McHeader = (props: CustomHeaderView<McPackage>) => {
  const { columnIndex, garden, groupByKey } = props;
  const label =
    groupByKey === 'finalPunch'
      ? 'M-01'
      : groupByKey === 'punchAccepted'
      ? 'M-02'
      : groupByKey === 'rfcc'
      ? 'M-04'
      : 'M-03';

  const mcCount = garden[columnIndex].items.filter((mcPackage) => {
    switch (groupByKey) {
      case 'finalPunch':
        return !!mcPackage.finalPunchActualDate;

      case 'punchAccepted':
        return !!mcPackage.punchAcceptActualDate || !!mcPackage.rfccActualDate;
      case 'rfcc':
        return !!mcPackage.rfccActualDate;
    }
    return !!mcPackage.rfccIsShipped;
  }).length;
  return (
    <StyledHeaderContainer>
      {garden[columnIndex].value}
      <div>
        {label}: {`${mcCount}/${garden[columnIndex].items.length}`}
      </div>
    </StyledHeaderContainer>
  );
};

export const GardenHeader = memo(McHeader);
