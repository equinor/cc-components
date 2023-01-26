import * as path from 'path';
import EnvironmentPlugin from 'vite-plugin-environment';
export default {
  plugins: [EnvironmentPlugin({ NODE_ENV: 'development' })],
  resolve: {
    alias: {
      '@cc-components/testapp5app': path.resolve('../../libs/testapp5app/src'),
      '@cc-components/shared': path.resolve('../../libs/shared/src'),
    },
  },
};
