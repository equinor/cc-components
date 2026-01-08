import { ReactElement } from 'react';

export type WorkspaceSidesheetProps<TData extends Record<PropertyKey, unknown>> = {
  sidesheetOptions?: SidesheetConfig<TData>;
};

export type SidesheetConfig<TData> = {
  type: 'default';
  DetailsSidesheet: (props: DetailsSidesheetProps<TData>) => ReactElement;
  CreateSidesheet?: (props: CreateSidesheetProps<TData>) => ReactElement;
};
//Future for Piping & release control, disabled for now
// | { type: 'custom'; Component: () => ReactElement }

export type DetailsSidesheetProps<TData> = {
  id: string;
  item?: TData;
  close: VoidFunction;
};

export type CreateSidesheetProps<TData> = {
  close: VoidFunction;
};
