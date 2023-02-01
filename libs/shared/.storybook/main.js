const rootMain = require('../../../.storybook/main');

const { mergeConfig } = require('vite');
const viteTsConfigPaths = require('vite-tsconfig-paths').default;

module.exports = {
  ...rootMain,
  core: { ...rootMain.core, builder: '@storybook/builder-vite' },
  stories: [
    ...rootMain.stories,
    '../src/lib/**/*.stories.mdx',
    '../src/lib/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [...rootMain.addons],
  async viteFinal(config, { configType }) {
    return mergeConfig(config, {
      plugins: [
        viteTsConfigPaths({
          root: '../../../',
        }),
      ],
    });
  },
};
