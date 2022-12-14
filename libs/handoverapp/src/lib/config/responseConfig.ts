import { HandoverPackage } from '@cc-components/handovershared';
import { sortPackagesByStatus } from '../utils-statuses/sortPackagesByStatus';

export const responseParser = async (response: Response) => {
  const parsedResponse = JSON.parse(await response.text()) as HandoverPackage[];
  return parsedResponse.sort(sortPackagesByStatus);
};
