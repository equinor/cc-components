import { useQuery } from '@tanstack/react-query';
import { OwnedBy, ReportInfo } from '../types/types';
import { useServiceDiscovery } from './useServiceDiscovery';

type ReportErrorInfo = {
  errorMessage: string;
  description: string;
  accessDescription: string;
  ownedBy: OwnedBy;
};

export const useReportErrorInfo = (reportUri: string) => {
  const serviceDisco = useServiceDiscovery();

  const getReportErrorInfo = async (
    reportUri: string,
    signal?: AbortSignal
  ): Promise<ReportErrorInfo> => {
    const errorMessage = getErrorMessage(reportUri, signal);
    const description = getDescription(reportUri, signal);
    const accessDescription = getAccessDescription(reportUri, signal);
    const info = getReportInfo(reportUri, signal);

    const results = await Promise.all([
      errorMessage,
      description,
      accessDescription,
      info,
    ]);

    return {
      errorMessage: results[0],
      description: results[1],
      accessDescription: results[2],
      ownedBy: results[3].ownedBy,
    };
  };

  const getErrorMessage = async (
    reportUri: string,
    signal?: AbortSignal
  ): Promise<string> => {
    const client = await serviceDisco.createClient('reports');
    const res = await client.fetch(`reports/${reportUri}/rlsrequirements`, { signal });
    return res.text();
  };

  const getDescription = async (
    reportUri: string,
    signal?: AbortSignal
  ): Promise<string> => {
    const client = await serviceDisco.createClient('reports');
    const res = await client.fetch(`reports/${reportUri}/description/content`, {
      signal,
    });
    return res.text();
  };

  const getAccessDescription = async (
    reportUri: string,
    signal?: AbortSignal
  ): Promise<string> => {
    const client = await serviceDisco.createClient('reports');
    const res = await client.fetch(`reports/${reportUri}/accessdescription/content`, {
      signal,
    });
    return res.text();
  };

  const getReportInfo = async (
    reportUri: string,
    signal?: AbortSignal
  ): Promise<ReportInfo> => {
    const client = await serviceDisco.createClient('reports');
    const res = await client.fetch(`reports/${reportUri}`, { signal });
    return res.json();
  };

  const { data, isLoading, error } = useQuery({
    queryKey: [reportUri, 'get-report-access-information'],
    queryFn: ({ signal }) => getReportErrorInfo(reportUri, signal),
  });

  return {
    data,
    isLoading,
    error,
  };
};
