import { StyledMonospace } from './Monospace';
import { StyledLink } from './cell.styles';

type LinkCellProps = {
  url: string;
  urlText: string;
  tooltipText?: string;
};
/**
 * Standard component for displaying a link in a table cell.
 */
export const LinkCell = ({
  url,
  urlText,
  tooltipText = 'Open in ProCoSys',
}: LinkCellProps): JSX.Element => {
  return (
    <StyledMonospace>
      <StyledLink href={url} target={'_blank'} rel="noreferrer" title={tooltipText}>
        {urlText}
      </StyledLink>
    </StyledMonospace>
  );
};
