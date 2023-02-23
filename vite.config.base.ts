import EnvironmentPlugin from 'vite-plugin-environment';
import injectProcessEnv from 'rollup-plugin-inject-process-env';
const base = {
  plugins: [
    {
      ...EnvironmentPlugin({ NODE_ENV: 'development' }),
      apply: 'serve',
    },
  ],
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
export default base;
