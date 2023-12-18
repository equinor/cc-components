import { TagOverlay } from 'libs/modelviewer/dist/src';
import { ModelViewerConfig } from 'libs/modelviewer/dist/src/providers/configProvider';

export type ModelViewerTabProps = {
  TagOverlay: string[] | TagOverlay[] | undefined;
  facility: string[];
  isFetching: boolean;
  error: Error | null;
  options?: ModelViewerConfig;
};
