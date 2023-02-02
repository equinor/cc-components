import { Popover, Typography } from '@equinor/eds-core-react';
import { ReportMetaDataProps } from '@equinor/workspace-fusion/power-bi';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { usePBIHelpers } from '../../hooks';

export const ReportMeta = ({ anchor, reportUri, close }: ReportMetaDataProps) => {
  const { getReportInfo } = usePBIHelpers();
  const { data } = useQuery(
    ['reportInfo', reportUri],
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
            <a href={`mailto:${data.ownedBy.mail}`}>{data.ownedBy.name}</a>
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
