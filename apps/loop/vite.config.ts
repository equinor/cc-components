import { Plugin } from 'vite-plugin-cdn-import';
import viteConfigBase from '../../vite.config.base';

export default {
  ...viteConfigBase,
  plugins: [
    ...viteConfigBase.plugins,
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
};
