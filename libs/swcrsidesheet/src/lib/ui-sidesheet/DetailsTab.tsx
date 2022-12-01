import { SwcrPackage } from '@cc-components/swcrshared';
import { SwcrSignature } from '../types';
import {
  StyledAttachments,
  StyledChipText,
  StyledSignatures,
  StyledTags,
  StyledTagsAndAttachmentBlock,
  StyledTextBlock,
  StyledTextBlockEmpty,
} from './sidesheet.styles';
import { Chip } from '@equinor/eds-core-react';
import { Fragment } from 'react';
import { StyledItemLink } from '@cc-components/shared';
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
    <div>
      <StyledTagsAndAttachmentBlock>
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
      </StyledTagsAndAttachmentBlock>
      <StyledTextBlock>
        <h5>Description</h5>
        {item?.description ? (
          <div>{item.description}</div>
        ) : (
          <StyledTextBlockEmpty>No description</StyledTextBlockEmpty>
        )}
      </StyledTextBlock>
      <StyledTextBlock>
        <h5>Modifications</h5>
        {item?.modification ? (
          <div>{item.modification}</div>
        ) : (
          <StyledTextBlockEmpty>No modifications</StyledTextBlockEmpty>
        )}
      </StyledTextBlock>
      <StyledSignatures>
        <h5>Next signatures</h5>
        <h5>Seq</h5>
        <h5>By</h5>

        {!signaturesFetching &&
          signatures &&
          signatures
            .filter((signature) => !signature.signDate)
            .map((signature, key) => (
              <Fragment key={'signature' + key}>
                <div>{signature.signatureRole}</div>
                <div>{signature.ranking}</div>
                <div>{signature.functionalRole || signature.person}</div>
              </Fragment>
            ))}
      </StyledSignatures>
    </div>
  );
};
