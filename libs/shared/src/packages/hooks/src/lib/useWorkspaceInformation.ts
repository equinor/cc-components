import { useAppEnvironmentVariables } from '@equinor/fusion-framework-react-app';

export type WorkspaceInformation = {
  title: string;
  dataSource: string;
  dataRefreshRate: string;
  access: string;
};

/**
 * Workspace info shown in the header. Values come from the Fusion app config
 * (editable in App Admin); `defaults` apply for keys the config doesn't have.
 */
export const useWorkspaceInformation = (
  defaults: WorkspaceInformation
): WorkspaceInformation => {
  const { value } = useAppEnvironmentVariables<Partial<WorkspaceInformation>>();
  return {
    title: value?.title ?? defaults.title,
    dataSource: value?.dataSource ?? defaults.dataSource,
    dataRefreshRate: value?.dataRefreshRate ?? defaults.dataRefreshRate,
    access: value?.access ?? defaults.access,
  };
};
