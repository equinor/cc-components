import { Button, Icon, Typography } from '@equinor/eds-core-react';
import { useOverlay } from '../../hooks/useOverlay';
import { useModelViewerContext } from '../../providers';
import TagIconShadowWrapper from './TagIconShadow';
import TagIcon from './TagIcon';
import { tag } from '@equinor/eds-icons';

import { RevealHtmlOverlayWrapper } from '../reveal-hml-overlay-wrapper/revealHtmlOverlayWrapper';
import { TagOverlay } from '../../types/overlayTags';
import { useState } from 'react';
import styled from 'styled-components';

import { tokens } from '@equinor/eds-tokens';

interface TagOverlayProps {
  tagsOverlay: TagOverlay[];
  iconResolver?: (type: string) => string;
  statusResolver?: (status: string) => string;
  titleResolver?: (overlay: TagOverlay) => string;
}

Icon.add({ tag: tag });

const ContextWrapperExpanded = styled.div`
  cursor: pointer;
  display: flex;
  flex-wrap: wrap;
`;

const TagText = styled.div`
  padding: 0px var(--small) 0px var(--small);
  text-align: start;
  cursor: pointer;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: auto;
  max-width: 240px;
  min-width: 55px;

  @media screen and (max-width: 440px) {
    max-width: 140px;
    min-width: 140px;
  }

  @media screen and (min-width: 440px) and (max-width: 560px) {
    max-width: 240px;
  }
`;

const TagInfoWrapper = styled.div`
  padding: 1px;
  display: flex;
  background-color: #ffffff;
  border-radius: 10rem;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  width: 100%;
  height: 52px;
  align-items: center;
  overflow: hidden;
  box-sizing: unset;
`;

const StyledTitleTypography = styled(Typography)`
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${tokens.colors.infographic.primary__moss_green_100.hex};
  font-weight: bold;
`;

const StyledDescriptionTypography = styled(Typography)`
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StyledTagInfoIcon = styled.div`
  margin: 3px;
`;

export const TagsOverlay = ({
  tagsOverlay,
  iconResolver,
  statusResolver,
  titleResolver,
}: TagOverlayProps): JSX.Element => {
  const { echoInstance } = useModelViewerContext();
  const [selected, setSelected] = useState<string>();

  const { overlayTags, overlayTool } = useOverlay(tagsOverlay);

  return (
    <div>
      {overlayTags.map((tag, index) => (
        <div
          key={`${tag.tagNo}_${index}`}
          title={titleResolver ? titleResolver(tag) : tag.tagNo}
          onClick={() => {
            echoInstance?.viewer.cameraManager.fitCameraToBoundingBox(tag.boundingBox);
          }}
        >
          <RevealHtmlOverlayWrapper
            overlayTool={overlayTool.current}
            position3d={tag.position}
            tagNo={tag.tagNo}
            aabb={tag.aabb}
          >
            {selected === tag.tagNo ? (
              <ContextWrapperExpanded
                onClick={() => {
                  setSelected(undefined);
                }}
              >
                <TagInfoWrapper>
                  <TagIcon
                    icon={
                      <Icon
                        name={iconResolver ? iconResolver(tag.type) : 'tag'}
                        color={'#ffffff'}
                      />
                    }
                    legendColor={statusResolver ? statusResolver(tag.status) : '#a0dd28'}
                  />
                  <TagText>
                    <StyledTitleTypography variant="h5">
                      {tag.tagNo}
                    </StyledTitleTypography>
                    <StyledDescriptionTypography>
                      {tag.description || 'no description provided'}
                    </StyledDescriptionTypography>
                  </TagText>

                  <StyledTagInfoIcon>
                    <Button variant="ghost_icon">
                      <Icon name="info_circle" title="tag information"></Icon>
                    </Button>
                  </StyledTagInfoIcon>
                </TagInfoWrapper>
              </ContextWrapperExpanded>
            ) : (
              <div
                onClick={() => {
                  setSelected(tag.tagNo);
                }}
              >
                <TagIconShadowWrapper>
                  <TagIcon
                    icon={
                      <Icon
                        name={iconResolver ? iconResolver(tag.type) : 'tag'}
                        color={'#ffffff'}
                      />
                    }
                    legendColor={statusResolver ? statusResolver(tag.status) : '#a0dd28'}
                  />
                </TagIconShadowWrapper>
              </div>
            )}
          </RevealHtmlOverlayWrapper>
        </div>
      ))}
    </div>
  );
};
