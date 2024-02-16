import {
  Accordion,
  Card,
  Typography,
  Button,
  Divider,
  CircularProgress,
} from '@equinor/eds-core-react';
import { PersonAvatar } from '@equinor/fusion-react-person';
import Markdown from 'markdown-to-jsx';

import {
  StyledErrorContent,
  StyledErrorLoadingWrapper,
  StyledErrorWrapper,
  StyledHeading,
  StyledReportDescriptionWrapper,
  StyledReportDetailsWrapper,
  StyledReportOwnerWrapper,
} from './accessErrorComponentStyles';

import { useReportErrorInfo } from '../useReportErrorInfo';

interface Props {
  reportUri: string;
  title?: string;
  subtitle?: string;
}

export const AccessErrorComponent = (props: Props) => {
  const {
    reportUri,
    title = 'Restricted Access',
    subtitle = 'It looks like you do not have access to this report',
  } = props;

  const { data, isLoading, error } = useReportErrorInfo(reportUri);

  if (isLoading) {
    return (
      <StyledErrorLoadingWrapper>
        <CircularProgress />
      </StyledErrorLoadingWrapper>
    );
  }

  if (error || !data) {
    return <div>Failed to load error message</div>;
  }

  return (
    <StyledErrorWrapper>
      <StyledErrorContent>
        <StyledHeading>{title}</StyledHeading>
        <Card elevation="raised">
          <Card.Header>
            <Card.HeaderTitle>
              <Typography variant="h3">{subtitle}</Typography>
              <Markdown>{data.accessDescription}</Markdown>
            </Card.HeaderTitle>
            <Button variant="ghost_icon"></Button>
          </Card.Header>
          <Card.Content>
            <Divider style={{ width: '100%' }} />
            <StyledReportDetailsWrapper>
              <StyledReportDescriptionWrapper>
                <Typography variant="h5">Report description</Typography>
                <Markdown>{data.description}</Markdown>
              </StyledReportDescriptionWrapper>

              <StyledReportOwnerWrapper>
                <Typography variant="h5">Report owner</Typography>
                <Card.Header style={{ paddingTop: '20px', paddingBottom: '20px' }}>
                  <PersonAvatar azureId={data.ownedBy.azureUniqueId} />
                  <Card.HeaderTitle>
                    <Typography variant="body_short_bold">{data.ownedBy.mail}</Typography>
                    <Typography variant="body_short">{data.ownedBy.name}</Typography>
                  </Card.HeaderTitle>
                </Card.Header>
              </StyledReportOwnerWrapper>
            </StyledReportDetailsWrapper>
          </Card.Content>
        </Card>

        <br />

        <Accordion>
          <Accordion.Item>
            <Accordion.Header>Access control description</Accordion.Header>
            <Accordion.Panel>
              <Markdown>{data.errorMessage}</Markdown>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </StyledErrorContent>
    </StyledErrorWrapper>
  );
};
