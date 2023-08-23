import { configure } from '@cc-components/modelviewerapp';
import { FusionModelViewer} from '@cc-components/modelviewer'
import { createRender } from '@cc-components/shared';

const App = () => {
  return (

      <FusionModelViewer  plantCode='jca'/>

  );
};

export const render = createRender(App, configure);
export default render;
