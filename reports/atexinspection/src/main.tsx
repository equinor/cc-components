import { RootAppWrapper, createRender } from '@cc-components/shared';
import { Report, configure } from '@cc-components/powerbi';

const AtexInspection = () => {
  return (
    <RootAppWrapper client={null}>
      <Report
        appKey={'atexinspection'}
        column={'ProjectMaster GUID'}
        reportId={'atex-inspection-analytics'}
        table={'Dim_ProjectMaster'}
      />
    </RootAppWrapper>
  );
};

export const render = createRender(AtexInspection, configure);
export default render;
