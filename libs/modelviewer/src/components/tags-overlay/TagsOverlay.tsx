import { FC, useState } from 'react';
import { useOverlay } from '../../hooks/useOverlay';
import { useModelViewerContext } from '../../providers';
import { TagOverlay } from '../../types/overlayTags';
import { RevealHtmlOverlayWrapper } from '../reveal-hml-overlay-wrapper/revealHtmlOverlayWrapper';
import { TagItem } from '../tag-item/TagItem';

type CustomComponentProps = {
  index: number;
  isSelected: boolean;
  clearSelection: () => void;
};

interface TagOverlayProps {
  iconResolver?: (type: string) => string;
  statusResolver?: (status: string) => string;
  titleResolver?: (overlay: TagOverlay) => string;
  CustomOverlayComponent?: FC<TagOverlay & CustomComponentProps>;
}

export const TagsOverlay = ({
  iconResolver,
  statusResolver,
  titleResolver,
  CustomOverlayComponent,
}: TagOverlayProps): JSX.Element => {
  const { echoInstance } = useModelViewerContext();

  const [selected, setSelected] = useState<string>();

  const { overlayTags, overlayTool } = useOverlay();

  const onSelected = (tag?: string) => {
    setSelected(tag);
  };

  return (
    <div>
      {overlayTags.map((tag, index) => {
        const isSelected = selected === tag.tagNo;
        return (
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
              {CustomOverlayComponent ? (
                <div
                  onClick={() => {
                    setSelected(tag.tagNo);
                  }}
                >
                  <CustomOverlayComponent
                    {...tag}
                    index={index}
                    clearSelection={() => onSelected()}
                    isSelected={isSelected}
                  />
                </div>
              ) : (
                <TagItem
                  {...{ tag, iconResolver, statusResolver, isSelected, onSelected }}
                />
              )}
            </RevealHtmlOverlayWrapper>
          </div>
        );
      })}
    </div>
  );
};
