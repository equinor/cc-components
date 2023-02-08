import * as path from 'path';
import EnvironmentPlugin from 'vite-plugin-environment';

import { Plugin } from 'vite-plugin-cdn-import';

export default {
  plugins: [
    EnvironmentPlugin({ NODE_ENV: 'development' }),
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
      '@cc-components/shared': path.resolve('../../libs/shared/src'),
    },
  },
};
