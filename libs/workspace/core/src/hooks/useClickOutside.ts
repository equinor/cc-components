import { RefObject, useEffect, useRef } from 'react';

export const useClickOutside = (
  elementRefs: RefObject<Element> | RefObject<Element>[],
  callback: (e: MouseEvent) => void,
  isActive = true
) => {
  const callbackRef = useRef(callback);

  const isClickInsideElements = (target: EventTarget | null): boolean => {
    const refs = Array.isArray(elementRefs) ? elementRefs : [elementRefs];
    return refs.some((ref) => ref.current?.contains(target as Node));
  };

  const handleClick = (e: MouseEvent) => {
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
