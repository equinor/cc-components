import { useMemo } from 'react';
import {
  StyledActualProgress,
  StyledProgressBarContainer,
  StyledProgressNumber,
} from './cell.styles';

type EstimateCellProps = {
  current: number;
  max: number;
};
/**
 * Standard component for displaying an estimate bar in a table cell.
 */
export const EstimateCell = ({ current, max }: EstimateCellProps): JSX.Element => {
  const percentage = useMemo(
    () => (max === 0 ? 0 : (current / max) * 100),
    [current, max]
  );
  return (
    <StyledProgressBarContainer>
      <StyledActualProgress borderColor="#0084C4" color="#CCE6F3" width={percentage} />
      <StyledProgressNumber>
        {parseFloat(Math.round(current).toString()).toLocaleString('no')}
      </StyledProgressNumber>
    </StyledProgressBarContainer>
  );
};
