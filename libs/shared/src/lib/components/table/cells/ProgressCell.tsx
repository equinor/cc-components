import {
  StyledActualProgress,
  StyledProgressBarContainer,
  StyledProgressNumber,
} from './cell.styles';

type ProgressCellProps = {
  percentWidth: number;
};
export const ProgressCell = ({ percentWidth }: ProgressCellProps): JSX.Element => {
  return (
    <StyledProgressBarContainer>
      <StyledActualProgress
        borderColor="#40D38F"
        width={percentWidth}
        color="#D9F6E9"
      ></StyledActualProgress>
      <StyledProgressNumber>{`${Math.round(percentWidth)}%`}</StyledProgressNumber>
    </StyledProgressBarContainer>
  );
};
