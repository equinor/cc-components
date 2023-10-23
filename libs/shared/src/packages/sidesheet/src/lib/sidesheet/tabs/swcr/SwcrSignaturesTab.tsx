import { TabTable } from '../../../../../../table-helpers/src/lib/table/TabTable/TabTable';
import { StyledContentWrapper } from '@cc-components/sharedcomponents';
import { signatureColumns } from './signatureColumns'; // Make sure this defines the columns for signatures
import { SwcrBase, SwcrSignature } from './types';

type SwcrSignatureTabProps = {
  signatures: SwcrSignature[] | undefined;
  isFetching: boolean;
  error: Error | null;
};


export const SwcrSignaturesTab = ({
  signatures,
  error,
  isFetching,
}: SwcrSignatureTabProps): JSX.Element => {


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