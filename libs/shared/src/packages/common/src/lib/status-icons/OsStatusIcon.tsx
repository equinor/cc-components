import { ReactElement } from 'react';

export interface GrayStatusIconProps {
  visualIndicator?: boolean;
}

export const OsStatusIcon = ({
  visualIndicator = true,
}: GrayStatusIconProps): ReactElement => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <ellipse
      style={{ fill: '#9CA6AC', stroke: 'white', strokeWidth: 2 }}
      cx="12"
      cy="12"
      rx="11"
      ry="11"
    />
    {visualIndicator && (
      <rect
        x="8"
        y="7"
        width="8"
        height="10"
        style={{ fill: 'transparent', stroke: 'white', strokeWidth: 4 }}
      />
    )}
  </svg>
);
