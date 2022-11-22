import { SwcrPackage } from '../types';
import { sortPackagesByStatusAndNumber } from '../utils-statuses';

export const responseParser = async (response: Response) => {
  const parsedResponse = JSON.parse(await response.text()) as SwcrPackage[];
  return parsedResponse.sort(sortPackagesByStatusAndNumber);
};
