import * as path from 'path';
import EnvironmentPlugin from 'vite-plugin-environment';
export default {
  plugins: [EnvironmentPlugin({ NODE_ENV: 'development' })],
  resolve: {
    alias: {
      '@cc-components/handoverapp': path.resolve('../../libs/handoverapp/src'),
      '@cc-components/shared': path.resolve('../../libs/shared/src'),
      '@cc-components/handoversidesheet': path.resolve(
        '../../libs/handoversidesheet/src'
      ),
      '@cc-components/handovershared': path.resolve('../../libs/handovershared/src'),
    },
  },
};
