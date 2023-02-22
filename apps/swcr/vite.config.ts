import * as path from 'path';
import EnvironmentPlugin from 'vite-plugin-environment';
import injectProcessEnv from 'rollup-plugin-inject-process-env';

export default {
  plugins: [EnvironmentPlugin({ NODE_ENV: 'development' })],
  resolve: {
    alias: {
      '@cc-components/swcrapp': path.resolve('../../libs/swcrapp/src'),
      '@cc-components/shared': path.resolve('../../libs/shared/src'),
      '@cc-components/swcrshared': path.resolve('../../libs/swcrshared/src'),
      '@cc-components/swcrsidesheet': path.resolve('../../libs/swcrsidesheet/src'),
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
