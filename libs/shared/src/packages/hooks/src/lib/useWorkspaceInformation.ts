import { useAppEnvironmentVariables } from '@equinor/fusion-framework-react-app';

export type WorkspaceInformation = {
  title: string;
  dataSource: string;
  dataRefreshRate: string;
  access: string;
};

/**
 * Workspace info shown in the header, read from the Fusion app config so app
 * admins can edit it in App Admin. Release seeds missing keys from the app's
 * app.config.defaults.json.
 */
export const useWorkspaceInformation = (): WorkspaceInformation => {
  const { value } = useAppEnvironmentVariables<Partial<WorkspaceInformation>>();
  return {
    title: value?.title ?? '',
    dataSource: value?.dataSource ?? '',
    dataRefreshRate: value?.dataRefreshRate ?? '',
    access: value?.access ?? '',
  };
};
