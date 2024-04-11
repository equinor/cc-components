import { useTagSelectionContext } from '../providers/tagSelectionProvider';

export const useCustomAction = () => {
  const { selectNodesByTags, selectNodes } = useTagSelectionContext();

  return {
    selectNodesByTags,
    selectNodes,
  };
};
