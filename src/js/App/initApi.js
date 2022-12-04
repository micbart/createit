import { apiInvoice } from "./apiInvoice";
import { sortByStatus } from "./sortByStatus";
import { sortByText } from "./sortByText";

export const initApiInvoice = () => {
    const invoice = document.querySelector('#invoices');
    if (!invoice) {
        return;
    }
    
    const resultArea = invoice.querySelector('#result-invoice');
    const togglersStatus = invoice.querySelectorAll('#invoice-status .toggler-status');
    const buttonTextSearch = invoice.querySelector('#invoice-search--submit');

    apiInvoice(resultArea);
    sortByStatus(togglersStatus, resultArea);
    sortByText(buttonTextSearch, resultArea);
}
