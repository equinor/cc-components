export { ModelViewerTab, ModelViewerTabProps } from './ModelViewerTab';
export { LazyModelViewerTab, LazyModelViewerTabProps } from './LazyModelViewerTab';
export { enableModelViewer } from './hooks/enableModelViewer';
export { ModelViewerEnvConfig } from './types';
// Export lightweight TagOverlay type separately to avoid pulling in heavy deps
export type { TagOverlay, TagMap } from './types/tagOverlay';
