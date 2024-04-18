import styled from 'styled-components';
import { security } from '@equinor/eds-icons';
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

type AccessErrorMessageProps = {
  error: Error;
};

export const AccessErrorMessage = (props: AccessErrorMessageProps): JSX.Element => {
  const { error } = props;

  return (
    <>
      <Styled.Wrapper>
        <Styled.Content>
          <Icon data={security} size={48} />
          <Styled.MessageContent>
            <Typography variant="h5">
              You don't have access to any 3D resources
            </Typography>
            <Typography>
              Request access to Echo in <b>Access IT</b> to apply for access.
            </Typography>
            <br />
            <Typography variant="body_short_italic">Error: {error.message}</Typography>
          </Styled.MessageContent>
        </Styled.Content>
      </Styled.Wrapper>
    </>
  );
};
