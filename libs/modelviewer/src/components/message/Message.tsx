import styled from 'styled-components';
import { MessageBoundaryState } from '../message-boundry/MessageBoundary';
import { Icon, Typography } from '@equinor/eds-core-react';
import { getIconByType } from '../../utils/message';

const Styled = {
  Wrapper: styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  MessageContent: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
  `,
  Content: styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
  `,
};

export const Message = ({ title, message, type }: MessageBoundaryState) => {
  return (
    <Styled.Wrapper>
      <Styled.Content>
        <Icon data={getIconByType(type)} size={48} />
        <Styled.MessageContent>
          <Typography variant="h3">{title}</Typography>
          <Typography>{message}</Typography>
        </Styled.MessageContent>
      </Styled.Content>
    </Styled.Wrapper>
  );
};
