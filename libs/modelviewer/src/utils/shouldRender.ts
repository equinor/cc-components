import { Vector3, Plane, PerspectiveCamera } from 'three';

const getDomPositionVars = {
  cameraNormal: new Vector3(),
  cameraPosition: new Vector3(),
  point: new Vector3(),
  nearPlane: new Plane(),
  farPlane: new Plane(),
};

export const shouldRender = (position3D: Vector3, camera?: PerspectiveCamera) => {
  if (!camera) return false;
  const { cameraNormal, cameraPosition, point, nearPlane, farPlane } = getDomPositionVars;
  camera.getWorldDirection(cameraNormal);
  camera.getWorldPosition(cameraPosition);

  point.copy(cameraPosition).addScaledVector(cameraNormal, camera.near);
  nearPlane.setFromNormalAndCoplanarPoint(cameraNormal, point);

  point.copy(cameraPosition).addScaledVector(cameraNormal, camera.far);
  farPlane.setFromNormalAndCoplanarPoint(cameraNormal, point);

  return (
    nearPlane.distanceToPoint(position3D) >= 0.0 &&
    farPlane.distanceToPoint(position3D) <= 0.0
  );
};
