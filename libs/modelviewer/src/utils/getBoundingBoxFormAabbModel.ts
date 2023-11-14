import { AabbModel } from '@equinor/echo-3d-viewer';
import { Box3, Vector3 } from 'three';

export function getBoundingBoxFormAabbModel(aabb: AabbModel, padding = 1) {
  const { min, max } = aabb;
  return new Box3(
    new Vector3(min.x - padding, min.z - padding, -max.y - padding),
    new Vector3(max.x + padding, max.z + padding, -min.y + padding)
  );
}
