import { AabbModel } from '@equinor/echo-3d-viewer';
import { PropsWithChildren, useEffect, useRef } from 'react';
import { Vector3 } from 'three';
import { HtmlOverlayToolHandler } from '../../services/htmlOverlayToolHandler';
import { createGlobalStyle } from 'styled-components';

export interface RevealHtmlOverlayWrapperProps {
  overlayTool: HtmlOverlayToolHandler | null;
  position3d: Vector3;
  offsetY?: number;
  tagNo: string;
  aabb: AabbModel;
}

const OverlayClustersStyle = createGlobalStyle`
  .tag-cluster {
    position: absolute;
    background: rgba(0, 132, 196, 1);
    cursor: pointer;
    color: #ffffff;
    border-radius: 50%;
    font-style: normal;
    font-weight: 800;
    font-size: 16px;
    line-height: 16px;
    transform: translate(-50%, -50%);
    width: 46px;
    height: 46px;
    border: 3px solid #ffffff;
    z-index: 1 !important;
    filter: drop-shadow(0px 12px 17px rgba(0, 0, 0, 0.14))
      drop-shadow(0px 5px 22px rgba(0, 0, 0, 0.12))
      drop-shadow(0px 7px 8px rgba(0, 0, 0, 0.2));
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .tag-cluster:hover {
    background: #058bce;
  }
`;

/* This wrapper component can be used with the Reveal HTML Overlay Tool. Should be used with a parent component
 * that holds the Overlay tool instance and the positions for the overlays. The wrapper will add the overlay to the
 * overlay tool when the component is mounted, and remove it when the component is unmounted.
 *
 * Note: If the content should be placed on exact location, you should set the offsetY to the height of the content.
 *
 * Example usage:
 * <ParentComponent>
 *   <RevealHtmlOverlayWrapper overlayTool={overlayTool} position3d={position3d} offsetY={-40}>
 *       <div>Overlay content</div>
 *  </RevealHtmlOverlayWrapper>
 * </ParentComponent>
 *  */
export const RevealHtmlOverlayWrapper: React.FC<
  PropsWithChildren<RevealHtmlOverlayWrapperProps>
> = ({ overlayTool, position3d, offsetY = 0, children, aabb, tagNo }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || !overlayTool) return;
    const refCopy = ref.current;
    overlayTool.add(ref.current, position3d, {
      userData: { e3dTagNo: tagNo, aabb },
    });
    return () => {
      // eslint-disable-next-line no-underscore-dangle, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any -- If global3DViewer is disposed then tool is disposed. Running remove on disposed tool will throw exception. This line is to avoid this
      if (overlayTool && (overlayTool as any)._disposed) return;
      if (refCopy && overlayTool) {
        overlayTool.remove(refCopy);
      }
    };
  }, [position3d, overlayTool]);

  return (
    <>
      <OverlayClustersStyle />
      <div
        ref={ref}
        className="Hello"
        style={{ position: 'absolute', transform: `translate(0px, ${offsetY}px)` }}
      >
        {children}
      </div>
    </>
  );
};
