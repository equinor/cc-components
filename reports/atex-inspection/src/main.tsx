import { Report, configure, RootAppWrapper, createRender } from '@cc-components/reportshared';

const AtexInspection = () => {
  return (
    <RootAppWrapper>
      <Report reportId={'atex-inspection-analytics'} />
    </RootAppWrapper>
  );
};

export const render = createRender(AtexInspection, configure(['Facility','ProjectMaster']));
export default render;
