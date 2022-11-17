import { StyledDescription } from './cell.styles';

type DescriptionCellProps = {
  description: string | null | undefined;
};

export const DescriptionCell = ({ description }: DescriptionCellProps): JSX.Element => {
  return <StyledDescription title={description || ''}>{description}</StyledDescription>;
};
