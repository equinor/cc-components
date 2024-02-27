import { Widget } from '@equinor/fusion-framework-react-app/widget';
import { Icon, Progress } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import styled from 'styled-components';
import { ModelViewerTabProps } from './types';

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

export const ModelViewerTab = ({
  TagOverlay,
  facility,
  options,
  isFetching,
  error,
}: ModelViewerTabProps): JSX.Element => {
  if (isFetching) {
    return (
      <NoResourceData>
        <Progress.Circular />
        <InfoText>Fetching 3D Tags</InfoText>
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
        <InfoText>Failed to load 3D tags</InfoText>
      </NoResourceData>
    );
  }

  if (TagOverlay?.length == 0) {
    return (
      <NoResourceData>
        <Icon
          name="error_outlined"
          size={40}
          color={tokens.colors.interactive.primary__resting.hsla}
          rotation={180}
        />
        <InfoText>No 3D tags</InfoText>
      </NoResourceData>
    );
  }

  if (facility && TagOverlay) {
    return (
      <Widget
        name="ModelViewer"
        props={{
          env: 'CI',
          facility: facility[0],
          options: options ?? undefined,
          tagsOverlay: TagOverlay,
        }}
      />
    );
  }

  return (
    //Sjekk senere
    <NoResourceData>
      <InfoText>No data available</InfoText>
    </NoResourceData>
  );
};
