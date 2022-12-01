import { useContextId } from '@cc-components/shared';
import { useHttpClient } from '@equinor/fusion-framework-react-app/http';
import { useCallback, useEffect, useState } from 'react';
import { SwcrSignature } from '../types';

type UseSignatures = {
  signatures: SwcrSignature[];
  signaturesFetching: boolean;
};

export const useSignatures = (swcrId: string): UseSignatures => {
  const [signatures, setSignatures] = useState<SwcrSignature[]>([]);
  const [signaturesFetching, setSignaturesFetching] = useState<boolean>(false);
  const contextId = useContextId();
  const dataProxy = useHttpClient('data-proxy');
  const getSignatures = useCallback(async (swcrId: string) => {
    setSignaturesFetching(true);
    try {
      const result = await dataProxy.fetch(
        `api/contexts/${contextId}/swcr/${swcrId}/signatures`
      );

      const parsedSignatures = JSON.parse(await result.text()) as SwcrSignature[];

      setSignatures(
        parsedSignatures.sort((a, b) =>
          a.ranking.localeCompare(b.ranking, undefined, {
            numeric: true,
            sensitivity: 'base',
          })
        ) || []
      );
    } catch {
      setSignatures([]);
    } finally {
      setSignaturesFetching(false);
    }
  }, []);

  useEffect(() => {
    getSignatures(swcrId);
  }, [swcrId, getSignatures]);

  return {
    signatures,
    signaturesFetching,
  };
};
