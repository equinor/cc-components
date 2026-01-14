import { getSwcrStatusColor, SwcrPackage } from '@cc-components/swcrshared';
import {
  StyledDetailsRow,
  StyledPopoverContainer,
  StyledPopoverProjectDescription,
  StyledPopoverProjectTitle,
} from '@cc-components/shared/common';
import styled from 'styled-components';

type PopoverContentProps = {
  swcr: SwcrPackage;
};

const StyledContainer = styled.div`
  max-width: 400px;
  word-wrap: break-word;
  overflow-wrap: break-word;
`;

const StyledStatuses = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5em;
  align-items: center;
  h5 {
    margin: 0;
  }
`;

const StyledStatus = styled.div<{ $color: string }>`
  width: fit-content;
  min-width: 40px;
  height: 24px;
  padding: 0 8px;
  display: flex;
  align-self: center;
  border: none;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  border-radius: 12px;
  background: ${(p) => p.$color};
`;

export const PopoverContent = ({ swcr }: PopoverContentProps) => {
  return (
    <StyledContainer>
      <StyledPopoverContainer>
        <StyledDetailsRow>
          <StyledPopoverProjectTitle>Project: </StyledPopoverProjectTitle>
          <p>
            {swcr.project}, {swcr.projectDescription}
          </p>
        </StyledDetailsRow>
        <StyledDetailsRow>
          <StyledPopoverProjectTitle>Facility: </StyledPopoverProjectTitle>
          <p>{swcr.facility}</p>
        </StyledDetailsRow>
        <StyledDetailsRow>
          <StyledPopoverProjectTitle>Description: </StyledPopoverProjectTitle>
          <StyledPopoverProjectDescription>{swcr.title}</StyledPopoverProjectDescription>
        </StyledDetailsRow>
        <hr />
        <StyledStatuses>
          <h5>Priority</h5>
          <p>{swcr.priority ?? 'N/A'}</p>
          <h5>Contract</h5>
          <p>{swcr.contract ?? 'N/A'}</p>
          <h5>Supplier</h5>
          <p>{swcr.supplier ?? 'N/A'}</p>
          <h5>System</h5>
          <p>{swcr.system ?? 'N/A'}</p>
          <h5>Comm Pkg</h5>
          <p>{swcr.commissioningPackageNo ?? 'N/A'}</p>
        </StyledStatuses>
      </StyledPopoverContainer>
    </StyledContainer>
  );
};
