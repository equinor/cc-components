import * as path from 'path';
export default {
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
};
