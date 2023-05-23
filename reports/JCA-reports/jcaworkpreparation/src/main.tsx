import { RootAppWrapper, createRender } from '@cc-components/shared';
import { Report, configure } from '@cc-components/powerbi';

const WorkPreparation = () => {
  return (
    <RootAppWrapper client={null}>
      <Report
        appKey={'jcaworkpreparation'}
        column={'ProjectMaster GUID'}
        reportId={'pp-work-preparation'}
        table={'Dim_ProjectMaster'}
      />
    </RootAppWrapper>
  );
};

export const render = createRender(WorkPreparation, configure);
export default render;
