import { StyledTabContent, TabTable } from '@cc-components/shared';
import { StyledContentWrapper } from '@cc-components/sharedcomponents';
import { Checkbox } from '@equinor/eds-core-react';
import { ScopeChangeRequest } from '@cc-components/scopechangerequestshared';
import { StyledTextBlock } from './sidesheet.styles';
type RequestTabProps = {
  scopechange?: ScopeChangeRequest | undefined;
  isFetching?: boolean;
  error?: Error | null;
};
export const RequestTab = ({
  scopechange,
  error,
  isFetching,
}: RequestTabProps): JSX.Element => {
  return (
    <StyledContentWrapper>
      <StyledTextBlock>
        <StyledTabContent>
          <h3>Request</h3>
          {scopechange?.description ? (
            <StyledTextBlock>
              <pre>{scopechange?.description}</pre>
            </StyledTextBlock>
          ) : (
            'N/A'
          )}
          <h3>Change origin</h3>
          {scopechange?.originSourceId ?? 'No change origin'}
          <h3>Disciplines and guesstimates</h3>
          <Checkbox
            checked={scopechange?.potentialAtsScope}
            readOnly={true}
            label="Potential ATS scope"
          />
          <h3>Materials</h3>
          <Checkbox
            checked={scopechange?.materialsIdentifiedInStorage}
            readOnly={true}
            label="Materials identified in storage"
          />
          <br></br>
          <Checkbox
            checked={scopechange?.materialsToBeBoughtByContractor}
            readOnly={true}
            label="Materials to be bought by contractor"
          />
          <h3>Revisions</h3>
          {'TBA'}
          <h3>Attachments</h3>
          {scopechange?.attachments.length !== 0 || undefined
            ? scopechange?.attachments.map((x) => x.fileName + ' - ' + x.blobPath) // TODO: Create hyperlink
            : 'None uploaded'}
        </StyledTabContent>
      </StyledTextBlock>
    </StyledContentWrapper>
  );
};
