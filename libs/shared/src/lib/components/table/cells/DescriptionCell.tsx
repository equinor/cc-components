import { StyledDescription, StyledFullDescription } from './cell.styles';

type DescriptionCellProps = {
  description: string | null | undefined;
  /**
   * Set to true if you want to display all the text.
   * Use together with
   * ```
   * autoHeight: true,
   * wrapText: true
   * ```
   * in the column definition to display everything and add line breaks where it overflows.
   */
  displayFullText?: boolean;
};

export const DescriptionCell = ({
  description,
  displayFullText,
}: DescriptionCellProps): JSX.Element => {
  return displayFullText ? (
    <StyledFullDescription> {description}</StyledFullDescription>
  ) : (
    <StyledDescription title={description || ''}>{description}</StyledDescription>
  );
};
