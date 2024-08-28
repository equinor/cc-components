import { TabTable } from '@cc-components/shared';
import { heatedTagsColumns } from './heatedTagsColumns';
import { HeatTraceHeatedTag } from '@cc-components/heattraceshared';

type HeatedTagsTabProps = {
  data: HeatTraceHeatedTag[] | undefined;
  isFetching: boolean;
  error: Error | null;
};

export const HeatedTagsTab = (props: HeatedTagsTabProps): JSX.Element => {
  const { data, error, isFetching } = props;
  return (
    <TabTable
      columns={heatedTagsColumns}
      error={error}
      isFetching={isFetching}
      packages={data}
      resourceName="Heated tags"
    />
  );
};
