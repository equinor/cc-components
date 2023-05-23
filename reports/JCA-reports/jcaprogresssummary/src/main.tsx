import { RootAppWrapper, createRender } from '@cc-components/shared';
import { Report, configure } from '@cc-components/powerbi';

const ProgressSummary = () => {
  return (
    <RootAppWrapper client={null}>
      <Report
        appKey={'jcaprogresssummary'}
        column={''}
        reportId={'pp-progress-status'}
        table={''}
      />
    </RootAppWrapper>
  );
};

export const render = createRender(ProgressSummary, configure);
export default render;
