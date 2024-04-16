import { Typography, Icon, Button, Popover } from '@equinor/eds-core-react';
import { TagOverlay } from '../../types/overlayTags';
import * as Icons from '@equinor/eds-icons';
import { useRef, useState } from 'react';
import styled from 'styled-components';

interface TagInfoProps {
  tag: TagOverlay;
}

export const defaultTagColor = '#a0dd28';

Icon.add(Icons);

export const TagInfo = (props: TagInfoProps) => {
  const { tag } = props;

  const [isOpen, setIsOpen] = useState(false);

  const ref = useRef<HTMLButtonElement>(null);

  const onClose = () => {
    setIsOpen(false);
  };

  const onOpen = () => {
    setIsOpen(true);
  };

  return (
    <>
      <StyledTagInfoIcon>
        <Button
          ref={ref}
          variant="ghost_icon"
          onClick={() => {
            if (tag.action) tag.action(tag);
            else onOpen();
          }}
        >
          <Icon name="info_circle" title="tag information" />
        </Button>
      </StyledTagInfoIcon>

      <Popover
        open={isOpen}
        id="tag-popover"
        anchorEl={ref.current}
        placement="bottom-end"
        onClose={onClose}
      >
        <Popover.Header>
          <Popover.Title>Details</Popover.Title>
          <Button
            style={{ height: '32px', width: '32px' }}
            variant="ghost_icon"
            aria-label="Close"
            onClick={onClose}
          >
            <Icon name="close" size={24} />
          </Button>
        </Popover.Header>
        <Popover.Content>
          <Typography variant="body_short">{tag.description}</Typography>
        </Popover.Content>
      </Popover>
    </>
  );
};

const StyledTagInfoIcon = styled.div`
  margin: 3px;
`;
