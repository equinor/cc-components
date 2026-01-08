import { useLayoutEffect, useRef } from 'react';
export function useResetScrollOnKeysChange(parentRef, grouping) {
    const initialRef = useRef(grouping);
    useLayoutEffect(() => {
        if (grouping === initialRef.current)
            return;
        parentRef.current?.scrollTo({ left: 0, top: 0 });
    }, [grouping, parentRef]);
}
