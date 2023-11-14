import { useContextId } from '@cc-components/shared/hooks';
import { useHttpClient } from '@cc-components/shared';
import { useCallback, useEffect, useState } from 'react';
import { SwcrSignature } from '../types';

type UseSignatures = {
  signatures: SwcrSignature[];
  signaturesFetching: boolean;
  error: Error | null;
};

export const useSignatures = (swcrId: string): UseSignatures => {
  const [signatures, setSignatures] = useState<SwcrSignature[]>([]);
  const [signaturesFetching, setSignaturesFetching] = useState<boolean>(false);
  const contextId = useContextId();
  const [error, setError] = useState<Error | null>(null);
  const dataProxy = useHttpClient();
  const getSignatures = useCallback(async (swcrId: string) => {
    setSignaturesFetching(true);
    try {
      const result = await dataProxy.fetch(
        `api/contexts/${contextId}/swcr/${swcrId}/signatures`
      );
      if (!result.ok) {
        throw new Error('Failed to fetch signatures');
      }
      const parsedSignatures = JSON.parse(await result.text()) as SwcrSignature[];
      setSignatures(parsedSignatures);
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
    error,
  };
};
