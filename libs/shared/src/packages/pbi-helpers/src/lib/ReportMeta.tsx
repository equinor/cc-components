import { Popover, Typography } from '@equinor/eds-core-react';
import { ReportMetaDataProps } from '@equinor/workspace-fusion/power-bi';
import { useSuspenseQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { usePBIHelpers } from './usePBIHelpers';

export const ReportMeta = ({ anchor, reportUri, close }: ReportMetaDataProps) => {
  const { getReportInfo } = usePBIHelpers();
  const { data } = useSuspenseQuery({
    queryKey: ['reportInfo', reportUri],
    queryFn: ({ signal }) => getReportInfo(reportUri, signal),
  });

  if (!data) {
    throw new Error();
  }
  return (
    <Popover
      open
      onClose={close}
      anchorEl={anchor}
      title={`Report information ${data.title}`}
      placement="bottom"
    >
      <Popover.Header>
        <Popover.Title>{data.title}</Popover.Title>
      </Popover.Header>
      <Popover.Content>
        <StyledContent>
          <StyledColumn>
            <Typography>Data Source</Typography>
            <Typography>Contact person</Typography>
            <Typography>Refresh rate</Typography>
            <Typography>Access</Typography>
          </StyledColumn>
          <StyledColumn>
            <Typography>{data.dataSources}</Typography>
            <Typography>
              <a href={`mailto:${data.ownedBy.mail}`}>{data.ownedBy.name}</a>
            </Typography>
            <Typography>{data.dataRefreshRate}</Typography>
            {/* TODO: add to header */}
            <Typography>{data.access}</Typography>
          </StyledColumn>
        </StyledContent>
      </Popover.Content>
    </Popover>
  );
};

const StyledColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3em;
`;

const StyledContent = styled.div`
  display: flex;
  gap: 1em;
`;
