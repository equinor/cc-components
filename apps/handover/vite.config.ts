import * as path from 'path';
export default {
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
};
