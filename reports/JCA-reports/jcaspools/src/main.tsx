import { RootAppWrapper, createRender } from '@cc-components/shared';
import { Report, configure } from '@cc-components/powerbi';

const MyApp = () => {
  return (
    <RootAppWrapper client={null}>
      <Report
        appKey={'jcaspools'}
        column={'ProjectMaster GUID'}
        reportId={'pp-spools-analytics'}
        //Dim_ProjectMaster does not exist in Report. data will show up for all projects if app is visible for project and user have access
        table={'Dim_ProjectMaster'}
      />
    </RootAppWrapper>
  );
};
export const render = createRender(MyApp, configure);
export default render;
