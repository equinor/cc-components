import { AabbModel } from '@equinor/echo-3d-viewer';
import { Box3, Vector3 } from 'three';

export interface DomPosition {
  left: string;
  top: string;
}

export interface OverlayTag {
  key: string;
  tagNo: string;
  description?: string;
  icon?: string | JSX.Element;
  status: string;
  type: string;
  position: Vector3;
  aabb: AabbModel;
  boundingBox: Box3;
}

export type TagOverlay = Omit<OverlayTag, 'key' | 'position' | 'aabb' | 'boundingBox'>;

export type TagMap = Record<string, TagOverlay>;
