import { MemoExoticComponent, MutableRefObject, ReactElement } from 'react';
import { GardenGroup } from '.';

export interface CustomItemView<TData extends Record<PropertyKey, unknown>> {
  color: string;
  displayName: string;
  description?: string;
  data: TData;
  groupingKeys: string[];
  onClick: () => void;
  columnExpanded: boolean;
  isSelected: boolean;
  rowStart: number;
  columnStart: number;
  parentRef: MutableRefObject<HTMLDivElement | null>;
  depth?: number;
  width?: number;
  colorAssistMode: boolean;
}

export interface CustomGroupView<TData extends Record<PropertyKey, unknown>> {
  data: GardenGroup<TData>;
  onClick: () => void;
  onSelect?: (item: TData) => void;
  onGroupeSelect?: (item: any) => void;
  columnExpanded: boolean;
  groupByKeys: (keyof TData | string)[];
}

export interface CustomHeaderView {
  header: GardenHeaderGroup;
  columnIndex: number;
  columnIsExpanded: boolean;
  groupByKey?: string;
}

export type GardenHeaderGroup = {
  name: string;
  count: number;
  columnSummary: number;
};

export interface CustomVirtualViews<TData extends Record<PropertyKey, unknown>> {
  customItemView?: MemoExoticComponent<(args: CustomItemView<TData>) => ReactElement>;
  customGroupView?: MemoExoticComponent<(args: CustomGroupView<TData>) => ReactElement>;
  customHeaderView?: MemoExoticComponent<(args: CustomHeaderView) => ReactElement>;
}
