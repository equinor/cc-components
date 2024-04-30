import styled from 'styled-components';
import { Icon, Typography } from '@equinor/eds-core-react';
import { CustomError } from '../../types/errors';

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

type CustomErrorMessageProps = {
  error: CustomError;
};

export const CustomErrorMessage = (props: CustomErrorMessageProps): JSX.Element => {
  const { error } = props;

  return (
    <>
      <Styled.Wrapper>
        <Styled.Content>
          <Icon data={error.icon} size={48} />
          <Styled.MessageContent>
            <Typography variant="h5">{error.message}</Typography>
            <Typography>{error.description}</Typography>
            <Typography variant="body_short_italic">
              {error.cause ? `Raw error: ${error.cause}` : null}
            </Typography>
          </Styled.MessageContent>
        </Styled.Content>
      </Styled.Wrapper>
    </>
  );
};
