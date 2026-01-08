import { useEffect, useRef } from 'react';
export const useClickOutside = (elementRefs, callback, isActive = true) => {
    const callbackRef = useRef(callback);
    const isClickInsideElements = (target) => {
        const refs = Array.isArray(elementRefs) ? elementRefs : [elementRefs];
        return refs.some((ref) => ref.current?.contains(target));
    };
    const handleClick = (e) => {
        if (isActive && !isClickInsideElements(e.target)) {
            callbackRef.current(e);
        }
    };
    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);
    useEffect(() => {
        if (isActive) {
            document.addEventListener('mousedown', handleClick);
            return () => {
                document.removeEventListener('mousedown', handleClick);
            };
        }
        return;
    }, [isActive, elementRefs]);
};
