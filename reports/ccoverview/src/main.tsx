import { RootAppWrapper, createRender } from '@cc-components/shared';
import { Report, configure } from '@cc-components/powerbi';

const CCOverview = () => {
  return (
    <RootAppWrapper client={null}>
      <Report
        appKey={'ccoverview'}
        column={'ProjectMaster GUID'}
        reportId={'ccoverview-analytics'}
        table={'Dim_ProjectMaster'}
      />
    </RootAppWrapper>
  );
};

export const render = createRender(CCOverview, configure);
export default render;
