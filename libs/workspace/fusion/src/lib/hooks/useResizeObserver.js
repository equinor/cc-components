import { useCallback, useLayoutEffect, useState } from 'react';
/**
 * Hook to observe width and height
 * @param ref Node that you want to observe size for
 * @param callback Optional callback function that accesses the node
 * @returns width and height for the observed node
 */
export const useResizeObserver = (ref, callback) => {
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const handleResize = useCallback((entries) => {
        if (!Array.isArray(entries)) {
            return;
        }
        const entry = entries[0];
        setWidth(entry.contentRect.width);
        setHeight(entry.contentRect.height);
        if (callback) {
            callback(entry.contentRect);
        }
    }, [callback]);
    useLayoutEffect(() => {
        if (!ref.current) {
            return;
        }
        let RO = new ResizeObserver((entries) => handleResize(entries));
        RO.observe(ref.current);
        // eslint-disable-next-line consistent-return
        return () => {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            RO.disconnect;
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            RO = null;
        };
    }, [ref]);
    return [width, height];
};
