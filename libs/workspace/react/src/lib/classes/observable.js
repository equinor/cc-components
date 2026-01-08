/**
 * Converts a value into an observable value
 * for more information se documentation.
 * [Observable](https://equinor.github.io/fusion-workspace/packages/workspace-core/observable)
 */
export class Observable {
    constructor(initialValue, compareFunc) {
        this.value = initialValue;
        compareFunc && (this.compareFunc = compareFunc);
    }
    /**List of callbacks being stored */
    #onchangeCallbacks = [];
    /**
     * Register a function to be called whenever the value changes
     * @param callback Function to be called when the value changes
     */
    onchange = (callback) => {
        const id = Math.random() * 16;
        this.#onchangeCallbacks.push({ callback, id });
        return () => {
            this.#onchangeCallbacks = this.#onchangeCallbacks.filter((cb) => cb.id !== id);
        };
    };
    /**
     * Sets a new value and notifies subscribers
     * @param value New value to be set
     */
    setValue = (value) => {
        const oldValue = this.value;
        if (this.compareFunc(value, oldValue))
            return;
        this.value = value;
        this.#onchangeCallbacks.forEach(({ callback }) => callback(value, oldValue));
    };
    /** The value */
    value;
    /** Prevents setting of identical values
     * return false if the old value is different from the new value
     */
    compareFunc = () => false;
}
