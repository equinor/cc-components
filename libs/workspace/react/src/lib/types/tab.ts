import { ReactElement } from 'react';

export interface Tab<TabName extends string = string> {
  name: TabName;
  Component: () => ReactElement;
  CustomHeader?: () => ReactElement;
  TabIcon: () => ReactElement;
}
