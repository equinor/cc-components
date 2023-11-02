import { CircularProgress, Typography } from '@equinor/eds-core-react';
import styled from 'styled-components';

type LoadingProps = {
  title?: string;
};

const Styled = {
  Wrapper: styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  Content: styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
  `,
};

export const Loading = ({ title }: LoadingProps) => {
  return (
    <Styled.Wrapper>
      <Styled.Content>
        <CircularProgress />
        <Typography>{title || 'Loading 3D Viewer'}</Typography>
      </Styled.Content>
    </Styled.Wrapper>
  );
};
