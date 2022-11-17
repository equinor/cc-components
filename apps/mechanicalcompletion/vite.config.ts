import * as path from 'path';
export default {
  resolve: {
    alias: {
      '@cc-components/mechanicalcompletionapp': path.resolve(
        '../../libs/mechanicalcompletionapp/src'
      ),
      '@cc-components/shared': path.resolve('../../libs/shared/src'),
    },
  },
};
