import ora from 'ora';
import { getFilesize } from './getFileSizeInBytes.js';

export function logBundleSize() {
  const bundleSpinner = ora('Calculating bundle size');
  const sizeInMb = getFilesize('./dist/app-bundle.js', 'mb');
  if (sizeInMb > 10) {
  }

  switch (true) {
    case sizeInMb >= 20:
      bundleSpinner.fail(`Bundle size ${sizeInMb}MB!`);
      break;

    case sizeInMb >= 10:
      bundleSpinner.warn(`Bundle size ${sizeInMb}MB`);
      break;

    default:
      bundleSpinner.succeed(`Bundle size ${sizeInMb}MB`);
  }
}
