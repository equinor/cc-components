import styled from 'styled-components';
import { Skeleton } from '../Skeleton';

import { tokens } from '@equinor/eds-tokens';
import { Button, Icon, Tabs } from '@equinor/eds-core-react';
import {
  StyledBanner,
  StyledPanels,
  StyledSideSheetContainer,
  StyledTabs,
} from '../../sidesheet';

const StyledTabListWrapper = styled.div`
  overflow: hidden;
  width: 100%;
  background-color: ${tokens.colors.ui.background__light.hex};
`;
const StyledTabsList = styled(Tabs.List)`
  overflow: auto;
  margin-left: 16px;
  gap: 1em;
  display: flex;
  scroll-behavior: smooth;
`;
const StyledSkeletonTable = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  margin-top: 50px;
`;

const StyledSkeletonHeader = styled.div`
  margin: 25px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`;

type SidesheetSkeletonProps = {
  close: () => void;
};

export function SidesheetSkeleton({ close }: SidesheetSkeletonProps) {
  return (
    <StyledSideSheetContainer>
      {/* Header */}
      <StyledSkeletonHeader>
        <Skeleton height="60px" width="100%" />
        <Button variant="ghost_icon" onClick={close}>
          <Icon
            name="close"
            color={tokens.colors.interactive.primary__resting.hex}
            cursor="pointer"
            type="div"
          />
        </Button>
      </StyledSkeletonHeader>
      <StyledBanner>
        {/* Banner items */}
        <Skeleton height="30px" width="100px" />
        <Skeleton height="30px" width="100px" />
        <Skeleton height="30px" width="100px" />
      </StyledBanner>
      <StyledTabs>
        <StyledTabListWrapper>
          <StyledTabsList>
            {/* Tabs */}
            <Skeleton height="40px" width="100px" />
            <Skeleton height="40px" width="100px" />
            <Skeleton height="40px" width="100px" />
            <Skeleton height="40px" width="100px" />
          </StyledTabsList>
        </StyledTabListWrapper>
        <StyledPanels>
          <Tabs.Panel>
            <StyledSkeletonTable>
              <Skeleton height="30px" width="100%" />
              <Skeleton height="30px" width="100%" />
              <Skeleton height="30px" width="100%" />
              <Skeleton height="30px" width="100%" />
              <Skeleton height="30px" width="100%" />
              <Skeleton height="30px" width="100%" />
              <Skeleton height="30px" width="100%" />
              <Skeleton height="30px" width="100%" />
            </StyledSkeletonTable>
            <StyledSkeletonTable>
              <Skeleton height="30px" width="100%" />
              <Skeleton height="30px" width="100%" />
              <Skeleton height="30px" width="100%" />
              <Skeleton height="30px" width="100%" />
              <Skeleton height="30px" width="100%" />
              <Skeleton height="30px" width="100%" />
              <Skeleton height="30px" width="100%" />
              <Skeleton height="30px" width="100%" />
            </StyledSkeletonTable>
          </Tabs.Panel>
        </StyledPanels>
      </StyledTabs>
    </StyledSideSheetContainer>
  );
}
