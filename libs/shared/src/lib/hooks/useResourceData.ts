import { useQuery } from 'react-query';

type FetchPackageResource<T> = (packageId: string, signal?: AbortSignal) => Promise<T[]>;
type PackageResourceReturn<T> = {
  data: T[] | undefined;
  isFetching: boolean;
  error: Error | null;
};
/**
 * Hook that uses React Query to fetch data.
 * @param resourceName Will be added as a query key
 * @param packageId Will be added as a query key and passed to fetch parameter
 * @param fetch Query function to be run
 */
export const usePackageResource = <T>(
  resourceName: string,
  packageId: string,
  fetch: FetchPackageResource<T>
): PackageResourceReturn<T> => {
  const { data, error, isLoading } = useQuery([resourceName, packageId], ({ signal }) =>
    fetch(packageId, signal)
  );

  return {
    data,
    isFetching: isLoading,
    error: error instanceof Error ? error : null,
  };
};
