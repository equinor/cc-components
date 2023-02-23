import * as path from 'path';
import EnvironmentPlugin from 'vite-plugin-environment';
import injectProcessEnv from 'rollup-plugin-inject-process-env';

export default {
  plugins: [
    {
      ...EnvironmentPlugin({ NODE_ENV: 'development' }),
      apply: 'serve',
    },
  ],
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
  build: {
    rollupOptions: {
      plugins: [
        injectProcessEnv({
          NODE_ENV: 'production',
        }),
      ],
    },
  },
};
