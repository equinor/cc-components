import { StyledLink } from './cell.styles';

type LinkCellProps = {
  url: string;
  urlText: string;
  tooltipText?: string;
};
export const LinkCell = ({
  url,
  urlText,
  tooltipText = 'Open in ProCoSys',
}: LinkCellProps): JSX.Element => {
  return (
    <StyledLink href={url} target={'_blank'} rel="noreferrer" title={tooltipText}>
      {urlText}
    </StyledLink>
  );
};
