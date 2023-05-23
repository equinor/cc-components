import { RootAppWrapper, createRender } from '@cc-components/shared';
import Report, { configure } from '@cc-components/powerbi';

const Checklist = () => {
  return (
    <RootAppWrapper client={null}>
      <Report
        appKey={'checklist'}
        column={'ProjectMaster GUID'}
        reportId={'checklist-analytics'}
        table={'Dim_ProjectMaster'}
      />
    </RootAppWrapper>
  );
};

export const render = createRender(Checklist, configure);
export default render;
