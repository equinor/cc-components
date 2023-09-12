import { AabbModel } from '@equinor/echo-3d-viewer';

export type Cluster = {
  htmlElement: HTMLElement;
  userData: {
    e3dTagNo: string;
    aabb?: AabbModel;
  };
};
