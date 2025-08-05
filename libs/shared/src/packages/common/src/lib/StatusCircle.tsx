import { Icon, Tooltip } from '@equinor/eds-core-react';
import { info_circle } from '@equinor/eds-icons'; // import "save" icon
import styled from 'styled-components';
import { GrayStatusIcon } from './status-icons/GrayStatusIcon';
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  width: fit-content;
  font-weight: 400;
  font-size: 13px;
`;
type StatusProps = {
  content: string;
  statusColor: string;
  infoMessage?: string;
};

/** Standard component for displaying a colored circle based on prop and content to the right of it. */
export const StatusCircle = ({ content, statusColor, infoMessage }: StatusProps) => {
  return (
    <Wrapper>
      <GrayStatusIcon />
      {infoMessage ? (
        <Tooltip title={infoMessage}>
          <Icon data={info_circle} size={18} color="rgb(0, 112, 121)" rotation={180} />
        </Tooltip>
      ) : null}
      <span>{content}</span>
    </Wrapper>
  );
};
