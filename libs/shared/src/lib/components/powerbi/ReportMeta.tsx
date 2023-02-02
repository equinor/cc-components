import { Popover, Typography } from '@equinor/eds-core-react';
import { ReportMetaDataProps } from '@equinor/workspace-fusion/power-bi';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { usePBIHelpers } from '../../hooks';

export const ReportMeta = ({
  anchor,
  reportUri,
  reportName,
}: ReportMetaDataProps & { reportName: string }) => {
  const { getReportInfo } = usePBIHelpers();
  const { data } = useQuery(
    ['reportInfo', reportUri, reportName],
    ({ signal }) => getReportInfo(reportUri, signal),
    {
      suspense: true,
      useErrorBoundary: true,
    }
  );

  if (!data) {
    throw new Error();
  }
  return (
    <Popover
      open
      anchorEl={anchor}
      title={`Report information ${reportName}`}
      placement="bottom"
    >
      <Popover.Header>
        <Popover.Title>{reportName}</Popover.Title>
      </Popover.Header>
      <Popover.Content>
        <StyledContent>
          <StyledColumn>
            <Typography>Data Source</Typography>
            <Typography>Contact person</Typography>
            <Typography>Refresh rate</Typography>
          </StyledColumn>
          <StyledColumn>
            <Typography>{data.dataSources}</Typography>
            <Typography>{data.ownedBy.name}</Typography>
            <Typography>{data.dataRefreshRate}</Typography>
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
