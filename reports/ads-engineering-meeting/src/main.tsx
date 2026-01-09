import { Report, configure, RootAppWrapper, createRender } from '@cc-components/reportshared';

const ReportWrapper = () => {
  return (
    <RootAppWrapper>
      <Report reportId={"ads-engineering-meeting"} />
    </RootAppWrapper>
  );
};

export const render = createRender(ReportWrapper, configure(['Facility','ProjectMaster']));
export default render;


