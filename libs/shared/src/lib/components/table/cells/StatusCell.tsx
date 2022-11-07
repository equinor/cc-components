import { HTMLAttributes } from 'react';
import { StyledStatus, StyledStatusWrapper } from './cell.styles';

type StatusCellProps<T extends string | number | null> = {
  content: T;
  cellAttributeFn: (content: T) => HTMLAttributes<HTMLElement>;
};
/**
 * React component to display a status circle and text to the right of the circle.
 * Circle will be whatever color and style that `cellAttributeFn` returns.
 */
export const StatusCell = <T extends string | number | null>({
  cellAttributeFn,
  content,
}: StatusCellProps<T>) => {
  const attr = cellAttributeFn ? cellAttributeFn(content) : undefined;

  return (
    <StyledStatusWrapper>
      <StyledStatus {...attr} />
      {content}
    </StyledStatusWrapper>
  );
};
