export interface Overlay {
  tagNo: string;
  status: string;
  type: string;
}

export type TagMap = Record<string, Overlay>;
