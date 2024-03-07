import {
  defineWidgetManifest,
  mergeWidgetManifests,
} from '@equinor/fusion-framework-cli';

import pkg from './package.json';

export default defineWidgetManifest((env, { base }) => {
  if (env.command === 'serve') {
    return mergeWidgetManifests(base, {
      description: pkg.description,
      entryPoint: pkg.main,
      name: pkg.name,
      version: pkg.version,
    });
  }
  return base;
});
