import { useState } from 'react';
import { useOverlay } from '../../hooks/useOverlay';
import { useModelViewerContext, useSelectionContext } from '../../providers';

import { RevealHtmlOverlayWrapper } from '../reveal-hml-overlay-wrapper/revealHtmlOverlayWrapper';
import { TagItem } from '../tag-item/TagItem';
import { useConfig } from '../../providers/configProvider';

export const TagsOverlay = (): JSX.Element => {
  const { echoInstance } = useModelViewerContext();

  const [selected, setSelected] = useState<string>();

  const { filterTags } = useSelectionContext();
  const { overlayTags, overlayTool } = useOverlay();
  const {
    defaultRadiusFactor,
    titleResolver,
    CustomOverlayComponent,
    iconResolver,
    statusResolver,
  } = useConfig();

  const onSelected = (tag?: string) => {
    setSelected(tag);
  };

  return (
    <div>
      {overlayTags
        .filter((ot) => filterTags.includes(ot.tagNo))
        .map((tag, index) => {
          const isSelected = selected === tag.tagNo;
          return (
            <div
              key={`${tag.tagNo}_${index}`}
              title={titleResolver ? titleResolver(tag) : tag.tagNo}
              onClick={() => {
                echoInstance?.viewer.cameraManager.fitCameraToBoundingBox(
                  tag.boundingBox,
                  defaultRadiusFactor
                );
              }}
            >
              <RevealHtmlOverlayWrapper
                overlayTool={overlayTool.current}
                position3d={tag.position}
                tagNo={tag.tagNo}
                aabb={tag.aabb}
              >
                {CustomOverlayComponent ? (
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelected(tag.tagNo);
                    }}
                  >
                    <CustomOverlayComponent
                      {...tag}
                      index={index}
                      clearSelection={() => setSelected(tag.tagNo)}
                      isSelected={isSelected}
                    />
                  </div>
                ) : (
                  <TagItem
                    tag={tag}
                    iconResolver={iconResolver}
                    statusResolver={statusResolver}
                    isSelected={isSelected}
                    onSelected={() => setSelected(tag.tagNo)}
                  />
                )}
              </RevealHtmlOverlayWrapper>
            </div>
          );
        })}
    </div>
  );
};
