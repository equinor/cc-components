import { Report, configure, RootAppWrapper, createRender } from '@cc-components/reportshared';

const ReportWrapper = () => {
  return (
    <RootAppWrapper>
      <Report reportId={"ads-offshore-installation-trends"} />
    </RootAppWrapper>
  );
};

export const render = createRender(ReportWrapper, configure(['Facility','ProjectMaster']));
export default render;


