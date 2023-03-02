const { mergeConfig } = require('vite');
const viteTsConfigPaths = require('vite-tsconfig-paths').default;
module.exports = {
  core: { builder: '@storybook/builder-vite' },
  stories: ['../../**/stories/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-essentials', 'storybook-addon-swc'],
  async viteFinal(config, { configType }) {
    return mergeConfig(config, {
      plugins: [
        viteTsConfigPaths({
          projects: ['../../tsconfig.base.json'],
        }),
      ],
    });
  },
};

// To customize your Vite configuration you can use the viteFinal field.
// Check https://storybook.js.org/docs/react/builders/vite#configuration
// and https://nx.dev/packages/storybook/documents/custom-builder-configs
