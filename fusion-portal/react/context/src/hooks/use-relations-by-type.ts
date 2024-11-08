import { useEffect, useMemo, useState } from 'react';
import { RelationReturnType, RelationsTypes } from '../types/relations';
import { useContextRelationsQuery } from '../queries/get-context-relations';

export function useRelationsByType<RT extends RelationsTypes>(
  type: RT,
  contextId?: string
) {
  const [error, setError] = useState<Error | undefined>();
  const { data, isLoading } = useContextRelationsQuery<RT>(contextId);

  const filteredRelations = useMemo(() => {
    setError(undefined);
    return (
      data?.filter((relation: RelationReturnType<RT>) => relation.type.id === type) || []
    );
  }, [data]);

  useEffect(() => {
    if (!isLoading && filteredRelations?.length === 0) {
      setError(Error(`No context relation found for ${type}`));
    }
  }, [isLoading, filteredRelations]);

  return { relations: filteredRelations, isLoading, error };
}
