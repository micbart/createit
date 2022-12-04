export const removeListItem = (area) => {
    for (const item of area.querySelectorAll('li')) {
        area.removeChild(item);
    }
}