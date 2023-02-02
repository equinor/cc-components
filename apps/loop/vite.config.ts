import * as path from 'path';
import EnvironmentPlugin from 'vite-plugin-environment';

export default {
  plugins: [EnvironmentPlugin({ NODE_ENV: 'development' })],
  resolve: {
    alias: {
      '@cc-components/loopapp': path.resolve('../../libs/loopapp/src'),
      '@cc-components/shared': path.resolve('../../libs/shared/src'),
    },
  },
};
