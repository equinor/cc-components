import { useEffect, useState } from 'react';

import { defaultTagColor } from '../components/tag-item/TagItem';
import { TagOverlay } from '../types/overlayTags';
import { useConfig } from '../providers';

export const useModelTags = (tagsOverlay: TagOverlay[]) => {
  const config = useConfig();

  const tagList = tagsOverlay.map((tagOverlay) => {
    if (!config.displayStatusColor) {
      return tagOverlay;
    }

    const color =
      tagOverlay.status && config.statusResolver
        ? config.statusResolver(tagOverlay.status)
        : defaultTagColor;

    return { ...tagOverlay, color };
  });

  const [visibleTags, setVisibleTags] = useState<string[]>([]);

  // When the tags overlay changes, reset state.
  useEffect(() => {
    const defaultVisibleTags = tagList.map((x) => x.tagNo);
    setVisibleTags(defaultVisibleTags);
  }, [tagsOverlay]);

  return {
    tagList,
    visibleTags,
    setVisibleTags,
  };
};
