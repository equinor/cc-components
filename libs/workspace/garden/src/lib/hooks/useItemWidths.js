import { useEffect, useState } from 'react';
export function useItemWidths(columnCount, itemWidth) {
    const [widths, setWidths] = useState([]);
    useEffect(() => {
        if (columnCount > 0) {
            setWidths(new Array(columnCount).fill(itemWidth));
        }
    }, [columnCount]);
    return widths;
}
