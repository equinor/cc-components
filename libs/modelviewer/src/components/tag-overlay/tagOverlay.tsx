import { Icon } from '@equinor/eds-core-react';
import { useOverlay } from '../../hooks/useOverlay';
import { useModelViewerContext } from '../../providers';
import TagIconShadowWrapper from './TagIconShadow';
import TagIcon from './TagIcon';
import { tag } from '@equinor/eds-icons';

import { RevealHtmlOverlayWrapper } from '../reveal-hml-overlay-wrapper/revealHtmlOverlayWrapper';
import { TagMap, Overlay } from '../../types/overlay';

interface TagOverlayProps {
  tagOverlay: TagMap;
  iconResolver?: (type: string) => string;
  statusResolver?: (status: string) => string;
  titleResolver?: (overlay: Overlay) => string;
}

Icon.add({ tag: tag });

export const TagOverlay = ({
  tagOverlay,
  iconResolver,
  statusResolver,
  titleResolver,
}: TagOverlayProps): JSX.Element => {
  const { echoInstance } = useModelViewerContext();

  const { overlayTags, overlayTool } = useOverlay(tagOverlay);
  console.log(overlayTags);
  return (
    <div>
      {overlayTags.map((tag, index) => (
        <div
          key={`${tag.tagNo}_${index}`}
          title={
            titleResolver
              ? titleResolver(tagOverlay[tag.tagNo])
              : tagOverlay[tag.tagNo].tagNo
          }
          onClick={() => {
            echoInstance?.viewer.cameraManager.fitCameraToBoundingBox(tag.boundingBox);
          }}
        >
          <RevealHtmlOverlayWrapper
            overlayTool={overlayTool.current}
            position3d={tag.position3d}
            tagNo={tag.tagNo}
            aabb={tag.aabb}
          >
            <TagIconShadowWrapper>
              <TagIcon
                icon={
                  <Icon
                    name={iconResolver ? iconResolver(tagOverlay[tag.tagNo].type) : 'tag'}
                    color={'#ffffff'}
                  />
                }
                legendColor={
                  statusResolver
                    ? statusResolver(tagOverlay[tag.tagNo].status)
                    : '#a0dd28'
                }
              />
            </TagIconShadowWrapper>
          </RevealHtmlOverlayWrapper>
        </div>
      ))}
    </div>
  );
};
