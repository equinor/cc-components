import { Button, Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
import { close } from '@equinor/eds-icons';
Icon.add({ close });

const StyledContainer = styled.div`
  display: flex;
  width: 100%;
  overflow: hidden;
`;
const StyledWrap = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding-left: 24px;
  padding-bottom: 24px;
  justify-content: space-between;
  align-items: center;
`;
const StyledTitle = styled.div`
  font-size: 24px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-top: 5px;
  padding-bottom: 5px;
`;
const StyledApplicationTitle = styled.div`
  font-size: 12px;
  white-space: nowrap;
  overflow: hidden;
  padding-top: 5px;
  padding-bottom: 5px;
`;
const StyledWrapTitles = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-between;
  padding-left: 8px;
`;
const StyledColor = styled.div<{ color?: string }>`
  display: flex;
  width: 3%;
  background-color: ${(prop) => prop.color || '#8c1159'};
`;
const StyledLeftSection = styled.div`
  display: flex;
  width: 90%;
  padding-top: 16px;
`;

const StyledRightSection = styled.div`
  display: flex;
  width: fit-content;
`;
type HeaderProps = {
  title: string;
  applicationTitle: string;
  color?: string;
  onClose: VoidFunction;
};
/**
 * Standard component for displaying a sidesheet header.
 * This will add a title and close button to the header.
 */
export const SidesheetHeader = ({
  title,
  applicationTitle,
  color,
  onClose,
}: HeaderProps) => {
  return (
    <StyledContainer>
      <StyledWrap>
        <StyledLeftSection>
          <StyledColor defaultValue={color} />
          <StyledWrapTitles>
            <StyledTitle>{title}</StyledTitle>
            <StyledApplicationTitle>{applicationTitle}</StyledApplicationTitle>
          </StyledWrapTitles>
        </StyledLeftSection>
        <StyledRightSection>
          <Button variant="ghost_icon" onClick={() => onClose()} title="Close sidesheet">
            <Icon
              name="close"
              size={24}
              color={tokens.colors.interactive.primary__resting.hex}
            />
          </Button>
        </StyledRightSection>
      </StyledWrap>
    </StyledContainer>
  );
};
