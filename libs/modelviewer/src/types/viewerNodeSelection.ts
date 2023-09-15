import { AabbModel } from '@equinor/echo-3d-viewer';

export interface ViewerNodeSelection {
  position: THREE.Vector3;
  tagNo: string;
  aabb: AabbModel;
  boundingBox: THREE.Box3;
}
