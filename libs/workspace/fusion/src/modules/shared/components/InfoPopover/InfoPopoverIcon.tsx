import { useState, useRef } from 'react';
import { Popover, Typography } from '@equinor/eds-core-react';
import styled from 'styled-components';
import * as ReactDOM from 'react-dom';
import { Information } from 'lib';

export type InfoPopoverIconProps = {
  information: Information;
};

export const InfoPopoverIcon = ({ information }: InfoPopoverIconProps) => {
  const [open, setOpen] = useState(false);
  const iconRef = useRef<HTMLSpanElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen((prev) => !prev);
  };

  const handleClose = () => setOpen(false);

  return (
    <StyledWrapper ref={iconRef}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        width="24"
        viewBox="0 0 24 24"
        style={{
          fill: '#6f6f6f',
          cursor: 'pointer',
          pointerEvents: 'auto',
          zIndex: 1,
          borderRadius: '50%',
          position: 'relative',
        }}
        onClick={handleClick}
      >
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
        <path d="M11 17h2v-6h-2v6zm0-8h2V7h-2v2z" />
      </svg>
      {open && (
        <PopoverInPortal>
          <Popover open onClose={handleClose} anchorEl={iconRef.current} placement="bottom">
            <Popover.Header>
              <Popover.Title>{information.title}</Popover.Title>
            </Popover.Header>
            <Popover.Content>
              <StyledContent>
                <StyledColumn>
                  <Typography>Data Source</Typography>
                  <Typography>Contact</Typography>
                  <Typography>Refresh rate</Typography>
                  <Typography>Access</Typography>
                </StyledColumn>
                <StyledColumn>
                  <Typography>{information.dataSource}</Typography>
                  <Typography>
                    {information.isAffiliate ? (
                      <a href={`mailto:itprocosys@equinor.com`}>Email</a>
                    ) : (
                      <a
                        href="https://equinor.service-now.com/selfservice?id=sc_cat_item&amp;sys_id=a71a17b51b8238d071424152b24bcba9"
                        target="blank"
                      >
                        Open a Request Item
                      </a>
                    )}
                  </Typography>
                  <Typography>{information.dataRefreshRate}</Typography>
                  <Typography>{information.access}</Typography>
                </StyledColumn>
              </StyledContent>
            </Popover.Content>
          </Popover>
        </PopoverInPortal>
      )}
    </StyledWrapper>
  );
};

const PopoverInPortal = ({ children }: { children: React.ReactNode }) => {
  if (typeof window === 'undefined') return null;
  return ReactDOM.createPortal(children, document.body);
};

const StyledColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3em;
`;

const StyledContent = styled.div`
  display: flex;
  gap: 1em;
`;

const StyledWrapper = styled.span`
  margin-left: auto;
  pointer-events: auto;
  cursor: pointer;
  position: relative;
  padding: 6px;
`;
