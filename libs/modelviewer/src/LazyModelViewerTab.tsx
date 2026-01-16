import { Suspense, lazy, ComponentProps } from 'react';
import { CircularProgress } from '@equinor/eds-core-react';
import styled from 'styled-components';

const ModelViewerTabLazy = lazy(() =>
  import('./ModelViewerTab').then((module) => ({ default: module.ModelViewerTab }))
);

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const Loading = () => (
  <LoadingContainer>
    <CircularProgress />
  </LoadingContainer>
);

export type LazyModelViewerTabProps = ComponentProps<typeof ModelViewerTabLazy>;

/**
 * Lazy-loaded wrapper for ModelViewerTab.
 *
 * Use this component instead of ModelViewerTab directly in sidesheets
 * to defer loading of heavy 3D dependencies (three.js, @cognite/reveal)
 * until the user actually navigates to the 3D tab.
 *
 * Note: Due to Fusion Portal's single-bundle requirement, this doesn't
 * reduce initial bundle size, but it does defer JavaScript parsing and
 * execution of heavy 3D code until needed.
 *
 * @example
 * ```tsx
 * import { LazyModelViewerTab } from '@cc-components/modelviewer';
 *
 * <Tabs.Panel>
 *   <LazyModelViewerTab
 *     tagOverlay={tags}
 *     facilities={['facility']}
 *     isFetching={false}
 *     error={null}
 *   />
 * </Tabs.Panel>
 * ```
 */
export const LazyModelViewerTab = (props: LazyModelViewerTabProps) => {
  return (
    <Suspense fallback={<Loading />}>
      <ModelViewerTabLazy {...props} />
    </Suspense>
  );
};
