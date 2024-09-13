import { Progress } from '@equinor/eds-core-react';

type LoadingTabTitleProps<T> = {
  isLoading: boolean;
  data: T[] | undefined;
  completed?: number
};
/**
 * Standard component for displaying a loading spinner and length of dataset.
 * Use this within the EDS `<Tabs.Tab>` component.
 */
export const TabTitle = <T extends Record<string, unknown>>({
  data,
  isLoading,
  completed
}: LoadingTabTitleProps<T>): JSX.Element => {
  const total = data?.length ?? 0;
  if (isLoading) {
    return <Progress.Dots color="primary" />;
  }
  if (!data) {
    return <>(0)</>;
  }

  if (total > 0 && completed !== undefined) {
    return <>({completed}/{total})</>;
  }

  return <>({total})</>;
};
