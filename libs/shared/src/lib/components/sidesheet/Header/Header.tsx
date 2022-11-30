import { Button, Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
import { close } from '@equinor/eds-icons';
import { useResizeContext } from '@equinor/workspace-sidesheet';
Icon.add({ close });

const StyledContainer = styled.div`
  display: flex;
  width: 100%;
`;
const StyledWrap = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding-left: 1em;
  justify-content: space-between;
  align-items: center;
`;
const StyledTitle = styled.div`
  font-size: 24px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
type HeaderProps = {
  title: string;
  onClose: VoidFunction;
};
export const SidesheetHeader = ({ title, onClose }: HeaderProps) => {
  const { setWidth } = useResizeContext();
  return (
    <StyledContainer>
      <StyledWrap>
        <Button onClick={() => setWidth(window.innerWidth)}>Width</Button>
        <StyledTitle>{title}</StyledTitle>
        <Button variant="ghost_icon" onClick={() => onClose()} title="Close sidesheet">
          <Icon
            name="close"
            size={24}
            color={tokens.colors.interactive.primary__resting.hex}
          />
        </Button>
      </StyledWrap>
    </StyledContainer>
  );
};
