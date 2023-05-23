import { RootAppWrapper, createRender } from '@cc-components/shared';
import { Report, configure } from '@cc-components/powerbi';

const Tags = () => {
  return (
    <RootAppWrapper client={null}>
      <Report
        appKey={'tags'}
        column={'ProjectMaster GUID'}
        reportId={'tags-analytics'}
        table={'Dim_ProjectMaster'}
      />
    </RootAppWrapper>
  );
};

export default createRender(Tags, configure);
