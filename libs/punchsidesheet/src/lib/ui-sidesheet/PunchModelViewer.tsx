import { FusionModelViewer } from '@cc-components/modelviewer';
import { TagOverlay } from '@cc-components/modelviewer';
import { Punch } from '@cc-components/punchshared';
import { PackageStatus, colorMap, hasProperty } from '@cc-components/shared';
import { useMemo } from 'react';
import styled from 'styled-components';

type PunchModelViewerProps = {
  punch: Punch | undefined;
  action: () => void;
};

const StyledWrapper = styled.div`
  height: calc(100vh - 276px);
  overflow: hidden;
  position: relative;
`;
const punchIcon = (status: string) => {
  return <h3>{status}</h3>;
};

export const PunchModelViewerTab = ({ punch, action }: PunchModelViewerProps) => {
  if (!punch?.facility) return null;

  const tagsOverlay = useMemo(() => {
    if (punch) {
      return [
        {
          tagNo: punch.tagNo,
          description: punch.description,
          status: punch.category,
          action,
          icon: punchIcon(punch.category),
        },
      ] as TagOverlay[];
    }
  }, [punch, action]);

  return (
    <StyledWrapper>
      <FusionModelViewer
        facility={punch.facility}
        options={{
          statusResolver: (status: string) => {
            return hasProperty(colorMap, status)
              ? colorMap[status as PackageStatus]
              : '#009922';
          },
          defaultCroppingDistance: 3,
          defaultRadiusFactor: 1,
        }}
        tagsOverlay={tagsOverlay}
      ></FusionModelViewer>
    </StyledWrapper>
  );
};
