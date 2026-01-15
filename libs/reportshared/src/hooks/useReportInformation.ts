import { useQuery } from '@tanstack/react-query';
import { usePBIHelpers } from './usePbiHelpers';
import { StaticInformation } from '../types/types';

type ReportInformationResult = {
  information: StaticInformation | undefined;
  isLoading: boolean;
  error: Error | null;
};

export const useReportInformation = (
  reportUri: string,
  isAffiliate?: boolean
): ReportInformationResult => {
  const { getReportInfo } = usePBIHelpers();

  const { data, isLoading, error } = useQuery({
    queryKey: ['reportInformation', reportUri],
    queryFn: async ({ signal }) => {
      const reportInfo = await getReportInfo(reportUri, signal);
      return {
        title: reportInfo.title,
        dataSource: reportInfo.dataSources,
        dataRefreshRate: reportInfo.dataRefreshRate,
        access: reportInfo.access,
        isAffiliate,
      } satisfies StaticInformation;
    },
    enabled: !!reportUri,
    staleTime: 1000 * 60 * 60,
    retry: 2,
  });

  return {
    information: data,
    isLoading,
    error,
  };
};
