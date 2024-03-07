import { Widget } from '@equinor/fusion-framework-react-app/widget';
import { TagOverlay } from '@cc-components/modelviewer';
import { ModelViewerConfig } from '@cc-components/modelviewer';
import { Icon, Progress } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import styled from 'styled-components';

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

export type ModelViewerTabProps = {
  tagOverlay: string[] | TagOverlay[] | undefined;
  facilities: string[];
  isFetching: boolean;
  error: Error | null;
  options?: ModelViewerConfig;
};

export const ModelViewerTab = (props: ModelViewerTabProps): JSX.Element => {
  const { tagOverlay, facilities, options, isFetching, error } = props;

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

  if (tagOverlay?.length == 0) {
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

  if (facilities[0] && tagOverlay) {
    return (
      <Widget
        name="ModelViewer"
        props={{
          env: 'CI',
          facility: facilities[0],
          options: options ?? undefined,
          tagsOverlay: tagOverlay,
        }}
      />
    );
  }

  return (
    <NoResourceData>
      <InfoText>No data available</InfoText>
    </NoResourceData>
  );
};
