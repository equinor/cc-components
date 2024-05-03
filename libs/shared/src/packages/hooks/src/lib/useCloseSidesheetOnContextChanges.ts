import { useEffect, useRef } from "react";
import { useContextId } from "./useContextId";

function usePrevious(value: string) {
  const ref = useRef<string>();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

export function useCloseSidesheetOnContextChange() {
  const contextId = useContextId();
  const previous = usePrevious(contextId)

  useEffect(() => {
    if (previous && previous !== contextId) {

      const url = new URL(window.location.href)
      url.searchParams.delete("item")
      window.history.pushState(null, "", url);
    }
  }, [contextId])

}
