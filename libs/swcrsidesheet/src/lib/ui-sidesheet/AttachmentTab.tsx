import { LinkCell, TabTable } from '@cc-components/shared';
import { StyledContentWrapper } from '@cc-components/sharedcomponents';
import { SwcrPackage } from '@cc-components/swcrshared';
import { ICellRendererProps } from '@equinor/workspace-fusion/grid';
import { ReactElement } from 'react';
import { SwcrAttachment } from '../types';

type AttachmentTabProps = {
  attachments: SwcrAttachment[] | undefined;
  isFetching: boolean;
  error: Error | null;
  detailsItem: SwcrPackage | undefined;
};

export const AttachmentTab = ({
  attachments,
  error,
  isFetching,
  detailsItem,
}: AttachmentTabProps): ReactElement => {
  const attachmentColumns = [
    {
      headerName: 'Title',
      valueGetter: (pkg: any) => pkg.data?.uri,
      cellRenderer: (props: ICellRendererProps<SwcrAttachment, string>) => {
        return (
          <LinkCell
            url={props.data?.uri ?? detailsItem?.swcrUrl}
            urlText={props.data?.title}
          />
        );
      },
      minWidth: 450,
    },
  ];

  return (
    <StyledContentWrapper>
      <TabTable
        columns={attachmentColumns}
        error={error}
        isFetching={isFetching}
        packages={attachments || []}
        resourceName="Attachments"
      />
    </StyledContentWrapper>
  );
};
