import { HandoverPackage } from '@cc-components/handovershared';
import { sortPackagesByStatus } from '../utils-statuses/sortPackagesByStatus';

export const responseParser = async (response: Response) => {
  const parsedResponse = await response.json();
  return parsedResponse.result.sort(sortPackagesByStatus);
};
