import { useEffect, useRef } from "react";
import { useContextId } from "./useContextId";

function usePrevious(value: string) {
  const ref = useRef<string>();
  useEffect(() => {
    ref.current = value; //assign the value of ref to the argument
  }, [value]); //this code will run when the value of 'value' changes
  return ref.current; //in the end, return the current ref value.
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
