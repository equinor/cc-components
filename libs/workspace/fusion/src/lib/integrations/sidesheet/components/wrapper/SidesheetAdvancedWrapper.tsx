import { ReactElement } from 'react';

type SidesheetAdvancedWrapperProps = {
  Config: () => ReactElement;
};

export const SidesheetAdvancedWrapper = ({ Config }: SidesheetAdvancedWrapperProps) => {
  return <Config />;
};
