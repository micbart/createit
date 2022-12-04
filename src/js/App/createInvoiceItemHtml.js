export const createInvoiceItemHtml = (data) => {
    return `<li>
            <span class="check" data-id="${data.id}"></span>
            <span class="id">${data.id}</span>
            <span class="restaurant">
                <a href="${data.url}" target="_blank">
                    <img src="${data.image}">
                    <span>${data.name}</span> 
                </a>
            </span>
            <span class="status">${data.status}</span>
            <span class="start-date">${data.startDate}</span>
            <span class="end-date">${data.endDate}</span>
            <span class="total">${data.total}</span>
            <span class="fees">${data.fees}</span>
            <span class="orders">${data.orders}</span>
        </li>`;
}