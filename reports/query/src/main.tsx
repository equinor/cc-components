import { RootAppWrapper, createRender } from '@cc-components/shared';
import { Report, configure } from '@cc-components/powerbi';

const Query = () => {
  return (
    <RootAppWrapper client={null}>
      <Report
        appKey={'query'}
        column={'ProjectMaster GUID'}
        reportId={'query-analytics'}
        table={'Dim_ProjectMaster'}
      />
    </RootAppWrapper>
  );
};

export const render = createRender(Query, configure);

export default render;
