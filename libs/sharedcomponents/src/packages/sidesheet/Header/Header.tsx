import { Button, Icon } from '@equinor/eds-core-react';
import { close, external_link } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

// Icon.add({ "close"})
// Icon.add({ close, external_link });

const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr 35px;
  padding-left: 24px;
  padding-bottom: 24px;
  padding-top: 24px;
  position: relative;
  gap: 1em;
  align-items: center;
`;
const StyledTitle = styled.div`
  font-size: 24px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const StyledDescription = styled.div`
  font-size: 18px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
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
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;
const StyledColor = styled.div<{ color?: string }>`
  width: 20px;
  height: 100%;
  display: flex;
  background-color: ${(prop) => prop.color || '#8c1159'};
`;
const StyledButton = styled.div`
  position: absolute;
  right: 0;
`;

const StyledUrlWrapper = styled.div`
  display: flex;
  align-items: center;
`;
type HeaderProps = {
  title: string;
  url?: string;
  description?: string;
  applicationTitle: string;
  color?: string;
  onClose: VoidFunction;
};
/**
 * Standard component for displaying a sidesheet header.
 * This will add a title, color and close button to the header.
 */
export const SidesheetHeader = ({
  title,
  url,
  description,
  applicationTitle,
  color,
  onClose,
}: HeaderProps) => {
  return (
    <StyledContainer>
      <StyledColor defaultValue={color} />
      <StyledWrapTitles>
        <StyledUrlWrapper>
          <StyledTitle> {title}</StyledTitle>
          {url ? (
            <Button
              style={{ width: '150px' }}
              variant="ghost"
              href={url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open in ProCoSys
              <Icon name="external_link" size={16}></Icon>
            </Button>
          ) : null}
        </StyledUrlWrapper>
        <StyledDescription> {description}</StyledDescription>
        <StyledApplicationTitle>{applicationTitle}</StyledApplicationTitle>
      </StyledWrapTitles>
      <StyledButton>
        <Button variant="ghost_icon" onClick={() => onClose()} title="Close sidesheet">
          <Icon
            name="close"
            size={24}
            color={tokens.colors.interactive.primary__resting.hex}
          />
        </Button>
      </StyledButton>
    </StyledContainer>
  );
};
