import { Card } from '@equinor/eds-core-react';

import { useCurrentUserInfo } from '@equinor/fusion-portal-react-utils';

import { ProfileCardHeader } from '../../profile-card-header/ProfileCardHeader';
import { ProjectPosition } from '../project-position/ProjectPosition';
import { TimeSlider } from '../time-slider/time-slider';
import { useState } from 'react';

export const User = () => {
  const { currentUserInfo } = useCurrentUserInfo();
  const [date, setDate] = useState(new Date());
  return (
    <Card elevation="raised">
      <ProfileCardHeader user={currentUserInfo} trigger="click" />
      <TimeSlider
        positions={currentUserInfo?.positions}
        onValueChange={(value) => setDate(new Date(value))}
      />
      <ProjectPosition positions={currentUserInfo?.positions} date={date} />
    </Card>
  );
};
