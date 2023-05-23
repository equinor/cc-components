import { RootAppWrapper, createRender } from '@cc-components/shared';
import { Report, configure } from '@cc-components/powerbi';

const Preservation = () => {
  return (
    <RootAppWrapper client={null}>
      <Report
        appKey={'preservationanalytics'}
        column={'ProjectMaster GUID'}
        reportId={'cc-preservation-analytics'}
        table={'Dim_ProjectMaster'}
      />
    </RootAppWrapper>
  );
};

export const render = createRender(Preservation, configure);
export default render;
