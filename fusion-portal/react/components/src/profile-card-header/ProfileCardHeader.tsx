import styled from 'styled-components';
import { Typography } from '@equinor/eds-core-react';

import { PersonAvatar } from '@equinor/fusion-react-person';

import { Skeleton } from '../components/skeleton/Skeleton';
import {
  PersonDetails,
  getDepartment,
  getJobTitle,
} from '@equinor/fusion-portal-react-utils';

const Style = {
  InfoWrapper: styled.div<{ paddingNone?: boolean }>`
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: ${({ paddingNone }) => (paddingNone ? '0px' : '1rem')};
  `,
};

export const ProfileCardHeader = ({
  user,
  trigger = 'none',
  paddingNone,
}: {
  user?: PersonDetails;
  trigger?: 'click' | 'hover' | 'none';
  paddingNone?: boolean;
}) => {
  if (!user) {
    return (
      <Style.InfoWrapper paddingNone={paddingNone}>
        <Skeleton variant="circle" size="medium" />

        <div>
          <Skeleton width="200px" />
          <div
            style={{
              paddingTop: '0.5rem',
              gap: '0.2rem',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Skeleton width={60} />
            <Skeleton width={60} />
          </div>
        </div>
      </Style.InfoWrapper>
    );
  }

  return (
    <Style.InfoWrapper paddingNone={paddingNone}>
      <PersonAvatar azureId={user.azureUniqueId} trigger={trigger} />
      <div>
        <Typography variant="h6">{user?.name}</Typography>
        <div>
          <Typography>{getDepartment(user)}</Typography>
          <Typography>{getJobTitle(user)}</Typography>
        </div>
      </div>
    </Style.InfoWrapper>
  );
};
