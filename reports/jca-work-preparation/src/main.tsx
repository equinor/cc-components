import { Report, configure, RootAppWrapper, createRender } from '@cc-components/reportshared';

const ReportWrapper = () => {
  return (
    <RootAppWrapper>
      <Report reportId={"pp-work-preparation"} />
    </RootAppWrapper>
  );
};

export const render = createRender(ReportWrapper, configure(['Facility','ProjectMaster']));
export default render;


