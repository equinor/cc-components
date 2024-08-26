import {
  StyledActualProgress,
  StyledProgressBarContainer,
  StyledProgressNumber,
} from './cell.styles';

type ProgressCellProps = {
  percentWidth: number;
};

/**
 * Standard component for displaying a progress bar inside a table cell.
 */
export const ProgressCell = ({ percentWidth }: ProgressCellProps): JSX.Element => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', height: '100%' }}>
      <StyledProgressNumber>{`${Math.round(percentWidth)}%`}</StyledProgressNumber>
      <StyledProgressBarContainer>
        {Math.round(percentWidth) > 0 ? (
          <StyledActualProgress
            $borderColor="#40D38F"
            $width={percentWidth}
            $color="#D9F6E9"
          ></StyledActualProgress>
        ) : (
          <></>
        )}
      </StyledProgressBarContainer>
    </div>
  );
};
