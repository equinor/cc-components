import { ReactElement } from 'react';

export interface RedStatusIconProps {
  visualIndicator?: boolean;
}

export const PaStatusIcon = ({
  visualIndicator = true,
}: RedStatusIconProps): ReactElement => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <ellipse
      style={{ fill: '#EB0000', stroke: 'white', strokeWidth: 2 }}
      cx="12"
      cy="12"
      rx="11"
      ry="11"
    />
    {visualIndicator && (
      <rect x="5" y="10" width="14" height="4" style={{ fill: 'white' }} />
    )}
  </svg>
);
