import { useQuery } from 'react-query';

type FetchPackageResource<T> = (packageId: string, signal?: AbortSignal) => Promise<T[]>;
type PackageResourceReturn<T> = {
  data: T[] | undefined;
  isFetching: boolean;
  error: Error | null;
};
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
