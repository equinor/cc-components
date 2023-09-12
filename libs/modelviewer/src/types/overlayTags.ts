import { AabbModel } from '@equinor/echo-3d-viewer';
import { Box3, Vector3 } from 'three';

export interface DomPosition {
  left: string;
  top: string;
}

export interface OverlayTag {
  key: string;
  tagNo: string;
  position3d: Vector3;
  aabb: AabbModel;
  boundingBox: Box3;
}
