import { FusionModelViewer, TagOverlay } from '@cc-components/modelviewer';

import { useMemo } from 'react';
import styled from 'styled-components';
import { tokens } from '@equinor/eds-tokens';
import { MccrBase } from './types';
import { PackageStatus, colorMap, hasProperty } from '@cc-components/shared';
import { Icon, Progress } from '@equinor/eds-core-react';

type MccrTabProps<T> = {
  mccr: T[] | undefined;
  isFetching: boolean;
  error: Error | null;
};

const StyledWrapper = styled.div`
  height: calc(100vh - 276px);
  overflow: hidden;
  position: relative;
`;
export const NoResourceData = styled.div`
  text-align: center;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
`;

export const InfoText = styled.h3`
  margin: 0;
`;

export const MccrModelViewerTab = <T extends MccrBase>({
  mccr,
  isFetching,
  error,
}: MccrTabProps<T>) => {
  const facility = useMemo(() => {
    return mccr?.map((mccr) => mccr.facility);
  }, [mccr]);

  const mccrIcon = (status: string) => {
    return <h3>{status}</h3>;
  };

  const tagsOverlay = useMemo(() => {
    return mccr?.map((mccr) => ({
      tagNo: mccr.tagNumber,
      description: mccr.description,
      status: mccr.mccrStatus,
      icon: mccrIcon(mccr.mccrStatus || ''),
    })) as TagOverlay[];
  }, [mccr]);

  if (isFetching) {
    return (
      <NoResourceData>
        <Progress.Circular />
        <InfoText>Fetching Mccr Tags</InfoText>
      </NoResourceData>
    );
  }

  if (error) {
    return (
      <NoResourceData>
        <Icon
          name="error_outlined"
          size={40}
          color={tokens.colors.interactive.primary__resting.hsla}
        />
        <InfoText>Failed to load Mccr tags</InfoText>
      </NoResourceData>
    );
  }

  if (facility && tagsOverlay) {
    return (
      <StyledWrapper>
        <FusionModelViewer
          facility={facility[0] || ''}
          options={{
            statusResolver: (status: string) => {
              return hasProperty(colorMap, status)
                ? colorMap[status as PackageStatus]
                : '#009922';
            },
            defaultCroppingDistance: 3,
          }}
          tagsOverlay={tagsOverlay}
        ></FusionModelViewer>
      </StyledWrapper>
    );
  }

  return null;
};
