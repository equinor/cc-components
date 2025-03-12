import { link } from 'fs';
import { StyledLink } from './cell.styles';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';

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
}: LinkCellProps): JSX.Element => {
  const onClick = () => {
    if (aiLinktype && aiLinkLocation) {
      console.log('Link clicked', aiLinktype, aiLinkLocation);
      ((window as any).ai as ApplicationInsights).trackEvent({
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
