import { useState } from 'react';

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

  const [visibleTags, setVisibleTags] = useState<string[]>(tagList.map((x) => x.tagNo));

  return {
    tagList,
    visibleTags,
    setVisibleTags,
  };
};
