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
`;

export const PunchModelViewerTab = ({ punch, action }: PunchModelViewerProps) => {
  if (!punch?.facility) return null;

  const punchIcon = () => {
    return <h3>{punch.category}</h3>;
  };

  const tagsOverlay = useMemo(() => {
    if (punch) {
      return [
        {
          tagNo: punch.tagNo,
          description: punch.description,
          color: hasProperty(colorMap, punch.category)
            ? colorMap[punch.category as PackageStatus]
            : '#ffffff',
          action,
          icon: punchIcon(),
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
          defaultCroppingDistance: 5,
          defaultCameraDistance: 3,
        }}
        tagsOverlay={tagsOverlay}
      ></FusionModelViewer>
    </StyledWrapper>
  );
};
