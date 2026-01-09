import { Provider, Tab } from '@equinor/workspace-react';
import { WorkspaceTabNames } from './tabs';
import { ReactElement } from 'react';

export type GetIdentifier<TData> = (item: TData) => string;
export type Information = {
  title: string;
  dataSource: string;
  dataRefreshRate: string;
  access: string;
  isAffiliate?: boolean;
};
export type WorkspaceConfig<TData, TabNames extends string = WorkspaceTabNames> = {
  getIdentifier: GetIdentifier<TData>;
  defaultTab?: TabNames;
  information?: Information;
};

export type WorkspaceConfiguration = {
  Sidesheet?: () => ReactElement;
  providers: Provider[];
  tabs: Tab[];
  defaultTab: string;
};
