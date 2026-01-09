import { Icon, Popover, Typography } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { PropsWithChildren, ReactElement, RefObject } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

const StyledPopover = styled(Popover)`
  padding: 1em;
  .arrow {
    display: none;
  }
`;

type PopoverWrapperProps = {
  isOpen: boolean;
  width: number;
  popoverTitle: string;
  parentRef: RefObject<HTMLDivElement | null>;
  close: VoidFunction;
  anchorRef: RefObject<HTMLDivElement | HTMLAnchorElement | null>;
};

/**
 * Standard popover component when hovering a Garden item.
 * This component wraps EDS' Popover component and adds extra checks for placements.
 */
export const PopoverWrapper = ({
  isOpen,
  width,
  parentRef,
  popoverTitle,
  children,
  close,
  anchorRef,
}: PropsWithChildren<PopoverWrapperProps>): ReactElement | null => {
  if (!isOpen || !parentRef.current) return null;

  return createPortal(
    <StyledPopover open={isOpen} anchorEl={anchorRef.current}>
      <Popover.Title
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          margin: '0px 14px',
        }}
      >
        <Typography as={'h2'}>{popoverTitle}</Typography>
        <Icon
          name="close"
          onClick={() => close()}
          color={tokens.colors.interactive.primary__resting.hex}
        />
      </Popover.Title>

      <Popover.Content>{children}</Popover.Content>
    </StyledPopover>,
    parentRef.current
  );
};
