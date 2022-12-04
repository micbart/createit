import { apiInvoice } from "./apiInvoice";
import { sortByStatus } from "./sortByStatus";
import { sortByText } from "./sortByText";
import { sortByDate } from "./sortByDate";

export const initApiInvoice = () => {
    const invoice = document.querySelector('#invoices');
    if (!invoice) {
        return;
    }
    
    const resultArea = invoice.querySelector('#result-invoice');
    const navArea = invoice.querySelector('.invoice-nav');
    const togglersStatus = invoice.querySelectorAll('#invoice-status .toggler-status');
    const buttonTextSearch = invoice.querySelector('#invoice-search--submit');
    const buttonDate = invoice.querySelector('#invoice-date-piceker--submit');

    apiInvoice(resultArea, navArea);
    sortByStatus(togglersStatus, resultArea, navArea);
    sortByText(buttonTextSearch, resultArea, navArea);
    sortByDate(buttonDate, resultArea, navArea);
}