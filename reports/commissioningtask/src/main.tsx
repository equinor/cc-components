import { RootAppWrapper, createRender } from '@cc-components/shared';
import { Report, configure } from '@cc-components/powerbi';

const MyApp = () => {
  return (
    <RootAppWrapper client={null}>
      <Report
        appKey={'commissioningtask'}
        column={'ProjectMaster GUID'}
        reportId={'commissioning-task'}
        table={'Dim_ProjectMaster'}
      />
    </RootAppWrapper>
  );
};

export const render = createRender(MyApp, configure);
export default render;
