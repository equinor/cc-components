import { StyledTabContent } from '@cc-components/shared/sidesheet';
import { SwcrPackage } from '@cc-components/swcrshared';
import { SwcrSignature } from '../types';
import { PreBlock, StyledTextBlock, StyledTextBlockEmpty } from './sidesheet.styles';
import styled from 'styled-components';
type DetailsTabProps = {
  item: SwcrPackage | undefined;
  signatures: SwcrSignature[] | undefined;
  signaturesFetching: boolean;
  attachmentsUrls: string | undefined;
};
export const DetailsTab = ({ item }: DetailsTabProps) => {
  return (
    <StyledTabContent>
      <DetailsBody>
        <StyledTextBlock>
          <h5>Description</h5>
          {item?.description ? (
            <PreBlock>{item.description}</PreBlock>
          ) : (
            <StyledTextBlockEmpty>No description</StyledTextBlockEmpty>
          )}
        </StyledTextBlock>
        <StyledTextBlock>
          <h5>Modifications</h5>
          {item?.modificationDescription ? (
            <PreBlock>{item.modificationDescription}</PreBlock>
          ) : (
            <StyledTextBlockEmpty>No modifications</StyledTextBlockEmpty>
          )}
        </StyledTextBlock>
      </DetailsBody>
    </StyledTabContent>
  );
};

const DetailsBody = styled.div`
  padding: 0 10px;
`;
