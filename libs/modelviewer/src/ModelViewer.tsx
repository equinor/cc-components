import { PropsWithChildren, useState } from 'react';
import { ActionsMenu } from './components/actions-bar/ActionsMenu';
import MessageBoundary from './components/message-boundry/MessageBoundary';
import ModelSelection from './components/model-selection/modelSelection';
import { TestPanel } from './components/test-panel/TestPanel';
import { ModelViewerContextProvider } from './providers/modelViewerProvider';
import { ModelContextProvider } from './providers/modelsProvider';
import { SelectionContextProvider } from './providers/selectionProvider';
import { ActionContextProvider } from './providers/actionProvider';
import { TagsOverlay } from './components/tag-overlay/tagOverlay';
import { TagMap, TagOverlay } from './types/overlayTags';

type FusionModelViewerProps = {
  plantName: string;
  plantCode: string;
  tagsOverlay?: string[] | TagOverlay[];
};

export const FusionModelViewer = (props: FusionModelViewerProps) => {
  return (
    <MessageBoundary
      fallbackComponent={({ title, message }) => (
        // Todo: add proper fallback component
        <div>
          <h1>{title}</h1>
          <p>{message}</p>
        </div>
      )}
    >
      <ModelViewer {...props} />
    </MessageBoundary>
  );
};

const ModelViewer = ({
  plantName,
  plantCode,
  tagsOverlay,
}: PropsWithChildren<FusionModelViewerProps>) => {
  const [tagList, setTagList] = useState<TagOverlay[]>([]);

  const handleTagList = (tagOverlay: string[] | TagOverlay[]) => {
    if (typeof tagOverlay[0] === 'string') {
      setTagList(
        (tagOverlay as string[]).map((tag) => ({
          tagNo: tag,
          description: '-',
          status: 'nan',
          type: 'tag',
        }))
      );
      return;
    } else {
      setTagList(tagOverlay as TagOverlay[]);
    }
  };
  return (
    <>
      <ModelViewerContextProvider>
        <ModelContextProvider plantCode={plantCode}>
          <SelectionContextProvider tags={tagList}>
            <ModelSelection plantName={plantName}>
              <ActionContextProvider>
                <TagsOverlay tagsOverlay={tagList} />
                <ActionsMenu />
                <TestPanel
                  setTags={(tags: string[] | TagOverlay[]) => handleTagList(tags)}
                />
              </ActionContextProvider>
            </ModelSelection>
          </SelectionContextProvider>
        </ModelContextProvider>
      </ModelViewerContextProvider>
    </>
  );
};
