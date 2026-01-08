export const fusionQueryParams = ['item', 'tab'];
export function tryGetTabFromUrl() {
    const [_, tab] = fusionQueryParams;
    return new URL(window.location.toString()).searchParams.get(tab);
}
/**
 * Function for patching query parameters without manipulating the other query parameters
 */
export function updateQueryParams(val) {
    const url = new URL(window.location.toString());
    val.forEach((val) => {
        const [topic, value] = val;
        if (!value) {
            url.searchParams.delete(topic);
        }
        else {
            url.searchParams.set(topic, value);
        }
    });
    history.replaceState(undefined, '', url);
}
