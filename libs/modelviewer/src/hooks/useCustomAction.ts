import { useSelectionContext } from '../providers/selectionProvider';

export const useCustomAction = () => {
  const { selectNodesByTags, selectNodesByTagColor, selectNodesByTagsOverlay } =
    useSelectionContext();

  return {
    selectNodesByTags,
    selectNodesByTagColor,
    selectNodesByTagsOverlay,
  };
};
