import { ReactElement } from 'react';
import { GardenHeaderGroup, GetDescription } from './';

export interface Visuals<TData extends Record<PropertyKey, unknown>> {
  /**
   * Height of a single garden item
   * Necessary for virtualization to work.
   * Supply this if you are using a custom item view
   */
  rowHeight?: number;
  headerHeight?: number;

  /** Function that returns the string of text that is to be displayed when a column is expanded */
  getDescription?: GetDescription<TData>;
  /** Function that returns the color of the item to be displayed */
  itemColor?: string;
  popoverComponent?: (props: PopoverComponentProps<TData>) => ReactElement;
  /** Pins the first column to the left edge while scrolling horizontally when this returns true for its header */
  freezeFirstColumn?: (header: GardenHeaderGroup) => boolean;
}

export type PopoverComponentProps<TData extends Record<PropertyKey, unknown>> = {
  item: TData;
};
