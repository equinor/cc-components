import { AabbModel } from '@equinor/echo-3d-viewer';
import { Box3, Vector3 } from 'three';
import { TagOverlay, TagMap } from './tagOverlay';

// Re-export lightweight types for consumers that don't need heavy deps
export type { TagOverlay, TagMap } from './tagOverlay';

/**
 * Full overlay tag with 3D positioning data.
 * Only used internally by ModelViewer components.
 */
export interface OverlayTag extends TagOverlay {
  key: string;
  position: Vector3;
  aabb: AabbModel;
  boundingBox: Box3;
}
