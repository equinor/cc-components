import { Punch } from '@cc-components/punchshared';
import { TagOverlay } from '@cc-components/modelviewer';

export const useModelViewerTags = (punch?: Punch): TagOverlay[] => {
  if (!punch) return [];

  return [
    {
      tagNo: punch.tagNo ?? 'No tag',
      description: punch.description ?? 'No description',
      status: punch.category,
      icon: <h3>{punch.category}</h3>,
    },
  ];
};
