import { PropsWithChildren, createContext, useCallback, useContext } from 'react';
import { AabbModel, HierarchyNodeModel } from '@equinor/echo-3d-viewer';
import { useSelectionControls } from '../services/selectionService';
import { TagOverlay } from '../types/overlayTags';
import { ViewerNodeSelection } from '../types/viewerNodeSelection';
import { useConfig } from './configProvider';
import { useModelTags } from '../hooks/useModelTags';
import { useModelNodes } from '../hooks/useModelNodes';

interface SelectionContextState {
  currentNodes: HierarchyNodeModel[];
  viewNodes: ViewerNodeSelection[];
  tagList: TagOverlay[];
  notFoundTagList: TagOverlay[];
  visibleTags: string[];
  isFetchingNodes: boolean;

  selectNodesByTags(tags: string[]): Promise<HierarchyNodeModel[] | undefined>;
  selectNodes(tagOverly: TagOverlay[]): Promise<HierarchyNodeModel[] | undefined>;
  orbit(): void;
  firstPerson(): void;
  fitCameraToAAbb(aabb: AabbModel): void;
  toggleTags(tags: string[]): void;
}

const SelectionContext = createContext({} as SelectionContextState);

export const useSelectionContext = () => useContext(SelectionContext);

type Props = {
  tagsOverlay: TagOverlay[];
} & PropsWithChildren;

export const SelectionContextProvider = (props: Props) => {
  const { tagsOverlay, children } = props;

  const config = useConfig();
  const selectionControls = useSelectionControls();

  const { visibleTags, tagList, setVisibleTags } = useModelTags(tagsOverlay);

  const {
    viewNodes,
    currentNodes,
    notFoundTagList,
    selectNodes,
    selectNodesByTags,
    isFetchingNodes,
  } = useModelNodes(tagList);

  const orbit = () => {
    if (currentNodes && selectionControls) {
      const target = selectionControls.getCenterFromNodes(currentNodes);
      selectionControls.cameraObitTarget(target);
    }
  };

  const firstPerson = () => {
    selectionControls?.cameraFirstPerson();
  };

  const fitCameraToAAbb = useCallback(
    (aabb: AabbModel, duration?: number) => {
      if (selectionControls) {
        const box3 = selectionControls.getBoundingBoxFormAabbModel(aabb);
        selectionControls.fitCameraToBox3(
          box3,
          duration || config.defaultCameraMoveDuration,
          config.defaultRadiusFactor
        );
      }
    },
    [selectionControls]
  );

  const toggleVisibleTags = (tags: string[]) => {
    const elements: string[] = tags.reduce((acc, tag) => {
      if (acc.includes(tag)) {
        acc = acc.filter((tagNo) => tagNo !== tag);
      } else {
        acc = [...acc, tag];
      }
      return acc;
    }, visibleTags);

    setVisibleTags(elements);
  };

  return (
    <SelectionContext.Provider
      value={{
        currentNodes,
        viewNodes,
        visibleTags,
        tagList,
        notFoundTagList,
        isFetchingNodes,
        selectNodesByTags,
        selectNodes,
        orbit,
        firstPerson,
        fitCameraToAAbb,
        toggleTags: toggleVisibleTags,
      }}
    >
      {children}
    </SelectionContext.Provider>
  );
};

export default SelectionContextProvider;
