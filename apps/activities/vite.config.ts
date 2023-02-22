import * as path from 'path';
import EnvironmentPlugin from 'vite-plugin-environment';
import injectProcessEnv from 'rollup-plugin-inject-process-env';
export default {
  plugins: [
    {
      apply: 'serve',
      ...EnvironmentPlugin({ NODE_ENV: 'development' }),
    },
  ],
  resolve: {
    alias: {
      '@cc-components/activitiesapp': path.resolve('../../libs/activitiesapp/src'),
      '@cc-components/shared': path.resolve('../../libs/shared/src'),
    },
  },
  build: {
    rollupOptions: {
      plugins: [
        injectProcessEnv({
          NODE_ENV: 'development',
        }),
      ],
    },
  },
};
