import { createDevConfig } from '@equinor/fusion-framework-cli';

export default createDevConfig(() => ({
  widgets: [
    {
      entryPoint: '/dist/widget-bundle.js',
      //entryPoint: '/src/index.ts',
      assetPath: '../../widgets/modelviewer/',
      name: 'ModelViewer',
    },
  ],
}));
