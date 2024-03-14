import styled from 'styled-components';
import { error_outlined } from '@equinor/eds-icons';
import { Icon, Typography } from '@equinor/eds-core-react';

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

type Props = {
  title: string;
  message: string;
};

export const ErrorMessage = (props: Props) => {
  const { title, message } = props;

  return (
    <Styled.Wrapper>
      <Styled.Content>
        <Icon data={error_outlined} size={48} />
        <Styled.MessageContent>
          <Typography variant="h3">{title}</Typography>
          <Typography>{message}</Typography>
        </Styled.MessageContent>
      </Styled.Content>
    </Styled.Wrapper>
  );
};
