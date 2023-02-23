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
      '@cc-components/workorderapp': path.resolve('../../libs/workorderapp/src'),
      '@cc-components/shared': path.resolve('../../libs/shared/src'),
      '@cc-components/workordersidesheet': path.resolve(
        '../../libs/workordersidesheet/src'
      ),
      '@cc-components/workordershared': path.resolve('../../libs/workordershared/src'),
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
