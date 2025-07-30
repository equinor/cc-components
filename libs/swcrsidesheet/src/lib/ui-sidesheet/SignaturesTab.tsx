import { TabTable } from '@cc-components/shared';
import { StyledContentWrapper } from '@cc-components/sharedcomponents';
import { SwcrSignature } from '../types';
import { signatureColumns } from '../utils-sidesheet/signatureColumns';
import { ReactElement } from 'react';

type SignatureTabProps = {
  signatures: SwcrSignature[] | undefined;
  isFetching: boolean;
  error: Error | null;
};

export const SignaturesTab = ({
  signatures,
  error,
  isFetching,
}: SignatureTabProps): ReactElement => {
  return (
    <StyledContentWrapper>
      <TabTable
        columns={signatureColumns} // Make sure this is set up for signatures
        error={error}
        isFetching={isFetching}
        packages={signatures || []} // Adjusted from workorders to signatures
        resourceName="Signatures"
      />
    </StyledContentWrapper>
  );
};
