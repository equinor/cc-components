import { useSelectionContext } from '../providers/selectionProvider';

export const useCustomAction = () => {
  const { selectNodesByTags, selectNodes } = useSelectionContext();

  return {
    selectNodesByTags,
    selectNodes,
  };
};
