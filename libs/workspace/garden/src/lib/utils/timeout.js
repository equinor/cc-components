export function cancelTimeout(handle) {
    handle && handle.id && cancelAnimationFrame(handle.id);
}
export function requestTimeout(fn, delay) {
    const start = Date.now();
    function loop() {
        if (Date.now() - start >= delay) {
            fn.call(null);
        }
        else {
            handle.id = requestAnimationFrame(loop);
        }
    }
    const handle = {
        id: requestAnimationFrame(loop),
    };
    return handle;
}
