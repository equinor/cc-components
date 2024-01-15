import { TagOverlay } from '@cc-components/modelviewer';
import { ModelViewerConfig } from '@cc-components/modelviewer';

export type ModelViewerTabProps = {
  TagOverlay: string[] | TagOverlay[] | undefined;
  facility: string[];
  isFetching: boolean;
  error: Error | null;
  options?: ModelViewerConfig;
};
