import { link } from 'fs';
import { StyledLink } from './cell.styles';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { useAppInsights } from '../../../../../hooks';
import { ReactElement } from 'react';

type LinkCellProps = {
  url?: string;
  urlText?: string;
  tooltipText?: string;
  aiLinktype?: string;
  aiLinkLocation?: string;
};
/**
 * Standard component for displaying a link in a table cell.
 */
export const LinkCell = ({
  url,
  urlText,
  aiLinktype,
  aiLinkLocation,
  tooltipText = 'Open in ProCoSys',
}: LinkCellProps): ReactElement => {
  const applicationInsights = useAppInsights();
  const onClick = () => {
    if (aiLinktype && aiLinkLocation) {
      applicationInsights?.trackEvent({
        name: 'LinkClicked',
        properties: {
          linkType: aiLinktype,
          linkLocation: aiLinkLocation,
          linkUrl: url,
          linkText: urlText,
        },
      });
    }
  };
  return (
    <StyledLink
      href={url}
      target={'_blank'}
      rel="noreferrer"
      title={tooltipText}
      onClick={onClick}
    >
      {urlText}
    </StyledLink>
  );
};
