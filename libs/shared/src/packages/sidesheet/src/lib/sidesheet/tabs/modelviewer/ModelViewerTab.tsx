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

const WidgetContainer = styled.div`
  height: 100%;
  > section {
    height: 100%;
    > div {
      height: 100%;
    }
  }
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

  if (facilities.length <= 0 || !tagOverlay) {
    return (
      <NoResourceData>
        <InfoText>No data available</InfoText>
      </NoResourceData>
    );
  }

  return (
    <WidgetContainer>
      <Widget
        name="ModelViewer"
        props={{
          facility: facilities[0],
          options: options ?? undefined,
          tagsOverlay: tagOverlay,
          hierarchyClientBaseUrl: 'https://app-echo-hierarchy-dev.azurewebsites.net',
          hierarchyClientScope: 'ebc04930-bf9c-43e5-98bc-bc90865600b8/user_impersonation',
          modelClientBaseUrl: 'https://app-echomodeldist-dev.azurewebsites.net',
          modelClientScope: 'd484c551-acf8-45bc-b1e8-3f4373bd0d42/user_impersonation',
          echoClientBaseUrl: 'https://dt-echopedia-api-dev.azurewebsites.net',
          echoClientScope: 'aef35d97-53d4-4fd0-adaf-c5a514b38436/user_impersonation',
        }}
      />
    </WidgetContainer>
  );
};
