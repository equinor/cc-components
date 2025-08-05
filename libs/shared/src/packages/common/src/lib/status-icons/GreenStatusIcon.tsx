import { ReactElement } from 'react';

export interface GreenStatusIconProps {
  visualIndicator?: boolean;
}

export const GreenStatusIcon = ({
  visualIndicator = true,
}: GreenStatusIconProps): ReactElement => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <ellipse
      style={{ fill: '#4BB748', stroke: 'white', strokeWidth: 2 }}
      cx="12"
      cy="12"
      rx="11"
      ry="11"
    />
    {visualIndicator && (
      <>
        <rect x="5" y="6" width="14" height="4" style={{ fill: 'white' }} />
        <rect
          x="5"
          y="14"
          width="14"
          height="4"
          style={{ fill: 'white', strokeWidth: 1 }}
        />
      </>
    )}
  </svg>
);
