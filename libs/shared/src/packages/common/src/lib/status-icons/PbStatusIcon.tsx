import { ReactElement } from 'react';

export interface YellowStatusIconProps {
  visualIndicator?: boolean;
}

export const PbStatusIcon = ({
  visualIndicator = false,
}: YellowStatusIconProps): ReactElement => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <ellipse
      style={{ fill: '#E9AB06', stroke: 'white', strokeWidth: 2 }}
      cx="12"
      cy="12"
      rx="11"
      ry="11"
    />
    {visualIndicator && (
      <rect x="10" y="5" width="4" height="14" style={{ fill: 'white' }} />
    )}
  </svg>
);
