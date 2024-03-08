import { Color } from 'three';
import { useSelectionControls } from '../services/selectionService';
import { TagOverlay } from '../types/overlayTags';
import { useQuery } from '@tanstack/react-query';
import { useConfig } from '../providers';

export const useModelNodes = (tagList: TagOverlay[]) => {
  const selectionControls = useSelectionControls();
  const config = useConfig();

  const tags = tagList.map((x) => x.tagNo);

  const selectNodes = async (tags: TagOverlay[]) => {
    const hasColors = tags.some((x) => x.color);

    if (!hasColors) {
      const elements = tags.map((x) => x.tagNo);
      return await selectNodesByTags(elements);
    }

    return await selectNodesByTagColor(tags);
  };

  const selectNodesByTags = async (tags: string[]) => {
    const nodes = await selectionControls?.selectNodesByTags(tags, {
      fitToSelection: true,
      radiusFactor: config.defaultRadiusFactor,
    });

    return nodes;
  };

  const selectNodesByTagColor = async (tags: TagOverlay[]) => {
    const elements = tags.map((tag) => ({
      tag: tag.tagNo,
      color: new Color(tag.color),
    }));

    const nodes = await selectionControls?.assignColorByTagColor(elements, {
      fitToSelection: true,
      radiusFactor: config.defaultCroppingDistance,
    });

    return nodes;
  };

  const { data, isFetching: isFetchingNodes } = useQuery({
    queryKey: ['echo-viewer', tags],
    queryFn: async () => {
      const currentNodes = await selectNodes(tagList);
      const viewNodes = selectionControls?.getViewerNodeSelection(currentNodes) || [];
      return { currentNodes, viewNodes };
    },
    refetchOnWindowFocus: false,
  });

  const viewNodes = data?.viewNodes ?? [];
  const currentNodes = data?.currentNodes ?? [];

  const notFoundTagList: TagOverlay[] = tagList.reduce((acc, item) => {
    const node = viewNodes?.find((x) => x.tagNo == item.tagNo);
    if (!node) acc.push(item);
    return acc;
  }, [] as TagOverlay[]);

  selectionControls.clipModelByNodes(currentNodes, true, config.defaultCroppingDistance);

  return {
    viewNodes,
    currentNodes,
    notFoundTagList,
    isFetchingNodes,
    selectNodes,
    selectNodesByTags,
  };
};
