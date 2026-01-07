import { ReactElement } from 'react';

export const LI = ({ children }: { children: ReactElement }): ReactElement => {
  return <li style={{ fontSize: '13px' }}>{children}</li>;
};
export const OL = ({ children }: { children: ReactElement }): ReactElement => {
  return <ol style={{ lineHeight: '1em' }}>{children}</ol>;
};
