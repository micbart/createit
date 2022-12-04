export const checkInvoice = (items) => {
    for (const item of items) {
        item.addEventListener('click', (event) => {
            event.preventDefault();
            item.classList.toggle('active');
        });
    }
}