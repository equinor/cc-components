import { PropsWithChildren, createContext, useCallback, useContext } from 'react';
import { AabbModel, HierarchyNodeModel } from '@equinor/echo-3d-viewer';
import { useModelSelectionControls } from '../services/useModelSelectionControls';
import { TagOverlay } from '../types/overlayTags';
import { ViewerNodeSelection } from '../types/viewerNodeSelection';
import { useConfig } from './configProvider';
import { useModelTags } from '../hooks/useModelTags';
import { useModelNodes } from '../hooks/useModelNodes';

interface TagSelectionContextState {
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

const TagSelectionContext = createContext({} as TagSelectionContextState);

export const useTagSelectionContext = () => useContext(TagSelectionContext);

type Props = {
  tagsOverlay: TagOverlay[];
} & PropsWithChildren;

export const TagSelectionProvider = (props: Props) => {
  const { tagsOverlay, children } = props;

  const config = useConfig();
  const selectionControls = useModelSelectionControls();

  const { tagList, visibleTags, setVisibleTags } = useModelTags(tagsOverlay);

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

  const fitCameraToAAbb = (aabb: AabbModel, duration?: number) => {
    if (selectionControls) {
      const box3 = selectionControls.getBoundingBoxFormAabbModel(aabb);
      selectionControls.fitCameraToBox3(
        box3,
        duration || config.defaultCameraMoveDuration,
        config.defaultRadiusFactor
      );
    }
  };

  const toggleTags = (tags: string[]) => {
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
    <TagSelectionContext.Provider
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
        toggleTags,
      }}
    >
      {children}
    </TagSelectionContext.Provider>
  );
};

export default TagSelectionProvider;
