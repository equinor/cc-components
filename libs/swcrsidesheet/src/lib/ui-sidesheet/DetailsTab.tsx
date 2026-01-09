import { StyledTabContent } from '@cc-components/shared/sidesheet';
import { MarkdownViewer } from '@cc-components/shared/markdown-viewer';
import { SwcrPackage } from '@cc-components/swcrshared';
import { SwcrSignature } from '../types';
import { StyledTextBlock, StyledTextBlockEmpty } from './sidesheet.styles';
import styled from 'styled-components';

type DetailsTabProps = {
  item: SwcrPackage | undefined;
};
export const DetailsTab = ({ item }: DetailsTabProps) => {
  return (
    <StyledTabContent>
      <DetailsBody>
        <StyledTextBlock>
          <h5>Description</h5>
          {item?.description ? (
            <MarkdownViewer>{item.description}</MarkdownViewer>
          ) : (
            <StyledTextBlockEmpty>No description</StyledTextBlockEmpty>
          )}
        </StyledTextBlock>
        <StyledTextBlock>
          <h5>Modifications</h5>
          {item?.modificationDescription ? (
            <MarkdownViewer>{item.modificationDescription}</MarkdownViewer>
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
