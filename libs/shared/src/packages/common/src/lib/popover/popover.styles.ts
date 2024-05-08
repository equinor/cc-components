import styled from 'styled-components';

export const StyledPopoverContainer = styled.div`
  white-space: nowrap;
  padding-top: 0 !important;

  hr {
    border: 1px solid #dcdcdc;
  }

  h5 {
    margin-top: 0;
    margin-bottom: 0;
  }

  p {
    margin: 0;
    font-size: 12px;
  }
`;

export const StyledPopoverProjectTitle = styled.p`
  font-weight: bold;
`;

export const StyledPopoverProjectDescription = styled.p`
  word-break: break-word;
  white-space: break-spaces;
`;

type PopoverProgressBarProps = {
  barColor: string;
  textColor: string;
};
export const StyledPopoverProgressBar = styled.div<PopoverProgressBarProps>`
  display: flex;
  border-radius: 4px;
  font-size: 12px;
  height: 24px;
  padding: 4px 8px;
  margin-top: 16px;
  text-transform: capitalize;
  background: ${(p) => p.barColor};
  color: ${(p) => p.textColor};
  line-height: 24px;
  text-align: center;
  justify-content: space-between;
  gap: 1rem;
  > strong:first-child {
    margin-right: 32px;
  }
`;

type StatusProps = {
  color: string;
};
export const StyledPopoverStatus = styled.div<StatusProps>`
  width: 40px;
  height: 24px;
  display: flex;
  align-self: center;
  border: none;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  border-radius: 12px;
  background: ${(p) => p.color};
`;
