import * as path from 'path';
import EnvironmentPlugin from 'vite-plugin-environment';
import injectProcessEnv from 'rollup-plugin-inject-process-env';
import { Plugin } from 'vite-plugin-cdn-import';

export default {
  plugins: [
    {
      ...EnvironmentPlugin({ NODE_ENV: 'development' }),
      apply: 'serve',
    },
    Plugin({
      modules: [
        {
          name: 'react',
          var: 'React',
          path: `https://unpkg.com/react@18.2.0/umd/react.development.js`,
        },
        {
          name: 'react-dom',
          var: 'ReactDOM',
          path: `https://unpkg.com/react-dom@18/umd/react-dom.development.js`,
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      '@cc-components/loopapp': path.resolve('../../libs/loopapp/src'),
      '@cc-components/loopshared': path.resolve('../../libs/loopshared/src'),
      '@cc-components/loopsidesheet': path.resolve('../../libs/loopsidesheet/src'),
      '@cc-components/shared': path.resolve('../../libs/shared/src'),
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
