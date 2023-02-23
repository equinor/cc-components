import * as path from 'path';
import EnvironmentPlugin from 'vite-plugin-environment';
export default {
  plugins: [EnvironmentPlugin({ NODE_ENV: 'development' })],
  resolve: {
    alias: {
      '@cc-components/tagsapp': path.resolve('../../libs/tagsapp/src'),
      '@cc-components/shared': path.resolve('../../libs/shared/src'),
    },
  },
};
