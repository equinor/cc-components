import { ReactElement } from 'react';

/**
 * Lightweight tag overlay type for sidesheets.
 * This type is separated from the full OverlayTag to avoid importing
 * heavy dependencies (three, echo-3d-viewer) in consuming components.
 */
export interface TagOverlay {
  [key: string]: unknown;
  tagNo: string;
  description?: string;
  icon?: string | ReactElement;
  status?: string;
  type?: string;
  color?: string;
  dataType?: string;
  action?: (tagOverlay?: TagOverlay) => void;
}

export type TagMap = Record<string, TagOverlay>;
