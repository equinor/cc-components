import { SwcrPackage } from '@cc-components/swcrshared';
import { SwcrSignature } from '../types';
import {
  PreBlock,
  SignatureBlock,
  StyledAttachments,
  StyledChipText,
  StyledSignatures,
  StyledTags,
  StyledTagsAndAttachmentBlock,
  StyledTextBlock,
  StyledTextBlockEmpty,
} from './sidesheet.styles';
import { Chip, CircularProgress  } from '@equinor/eds-core-react';
import { Fragment } from 'react';
import { StyledTabContent, StyledTable } from '@cc-components/shared/sidesheet';
import { StyledItemLink } from '@cc-components/shared/common';
type DetailsTabProps = {
  item: SwcrPackage | undefined;
  signatures: SwcrSignature[] | undefined;
  signaturesFetching: boolean;
  attachmentsUrls: string | undefined;
};
export const DetailsTab = ({
  item,
  signatures,
  signaturesFetching,
  attachmentsUrls,
}: DetailsTabProps) => {
  return (
    <StyledTabContent style={{ marginTop: '1em', marginBottom: '1em' }}>
      {/* <StyledTagsAndAttachmentBlock>
        <StyledTags>
          <Chip>
            <StyledChipText>{item?.contract || '-'}</StyledChipText>
          </Chip>
          <Chip>
            <StyledChipText>{item?.priority || '-'}</StyledChipText>
          </Chip>
          <Chip>
            <StyledChipText>{item?.referenceTypes || '-'}</StyledChipText>
          </Chip>
          <Chip>
            <StyledChipText>{item?.supplier || '-'}</StyledChipText>
          </Chip>
          <Chip>
            <StyledChipText>{item?.system || '-'}</StyledChipText>
          </Chip>
        </StyledTags>
        {parseInt(item?.cntAttachments || '0') > 0 && (
          <StyledAttachments>
            Attachments:
            <StyledItemLink target="_BLANK" href={attachmentsUrls} rel="noreferrer">
              {item?.cntAttachments}
            </StyledItemLink>
          </StyledAttachments>
        )}
      </StyledTagsAndAttachmentBlock> */}
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

      {/* <StyledTextBlock>
      <h5>Signatures</h5>
      <StyledSignatures>
      <h5>Next Signatures</h5>
      <h5>Seq</h5>
      <h5>By</h5>
      
      {signaturesFetching ? (
        <CircularProgress />
      ) : (
        signatures && signatures.length > 0 ? (
          signatures
            .filter((signature) => !signature.signedDate)
            .sort((a, b) => parseInt(a.sequence, 10) - parseInt(b.sequence, 10))
            .map((signature, key) => (
              <Fragment key={'signature' + key}>
                  <SignatureBlock>{signature.signatureRole}</SignatureBlock>
                  <SignatureBlock>{signature.sequence}</SignatureBlock>
                  <SignatureBlock>{signature.functionalRole}</SignatureBlock>
              </Fragment>
            ))
        ) : (
          <p>There are no signatures</p>
        )
      )}
      </StyledSignatures>

      </StyledTextBlock> */}

    </StyledTabContent>
  );
};
