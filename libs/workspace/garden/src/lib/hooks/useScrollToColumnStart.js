import { useLayoutEffect } from 'react';
/**
 *  Scrolls to column start when garden is grouped on certain keys
 * @param columnStart - Where to scroll to
 * @param columnVirtualizer - The garden virtualizer
 */
export function useScrollToColumnStart(columnStart, columnVirtualizer, groupingKeys) {
    useLayoutEffect(() => {
        if (columnStart) {
            columnVirtualizer.scrollToIndex(columnStart, { align: 'center' });
        }
    }, [columnStart, groupingKeys]);
}
