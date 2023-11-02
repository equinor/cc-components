/**
 * Debouncer for a generic input function.
 * @example
 * const logHeyAfter500MsIfNotInvoked = debounce(() => {console.log("hey")}, 500)
 * await promise.delay(300) // Delay for 300 Ms
 * logHeyAfter500MsIfNotInvoked() // Invoking resets the timer
 * // Wait for 500ms
 * // Console will now show the "hey" message
 * logHeyAfter500MsIfNotInvoked() // You can restart the timer, and it will trigger again in 500ms
 * @param func Input function to trigger when the returned function has not been invoked for X milliseconds
 * @param waitForMs the time to wait in milliseconds before triggering the func
 * @returns The function to invoke to delay the input function
 */
export function debounce<F extends (...args: Parameters<F>) => ReturnType<F>>(
  func: F,
  waitForMs: number
): (...args: Parameters<F>) => void {
  // Implementation Adapted from ideas in https://gist.github.com/ca0v/73a31f57b397606c9813472f7493a940 and comments
  let timeout: number | undefined;

  // eslint-disable-next-line func-names -- Intentionally Un-named
  return function (this: unknown, ...args: Parameters<F>): void {
    window.clearTimeout(timeout);
    timeout = window.setTimeout(() => func.apply(this, args), waitForMs);
  };
}
