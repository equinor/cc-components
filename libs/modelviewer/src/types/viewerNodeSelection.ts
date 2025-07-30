import { AabbModel } from '@equinor/echo-3d-viewer';
import { Box3, Vector3 } from 'three';

export interface ViewerNodeSelection {
  position: Vector3;
  tagNo: string;
  aabb: AabbModel;
  boundingBox: Box3;
}
