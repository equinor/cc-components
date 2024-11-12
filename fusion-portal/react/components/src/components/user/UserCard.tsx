import { Card } from '@equinor/eds-core-react';

import { useCurrentUserInfo } from '@equinor/fusion-portal-react-utils';

import { ProfileCardHeader } from '../../profile-card-header/ProfileCardHeader';
import { ProjectPosition } from '../project-position/ProjectPosition';

export const User = () => {
  const { currentUserInfo } = useCurrentUserInfo();

  return (
    <Card elevation="raised">
      <ProfileCardHeader user={currentUserInfo} trigger="click" />
      <ProjectPosition positions={currentUserInfo?.positions} />
    </Card>
  );
};
