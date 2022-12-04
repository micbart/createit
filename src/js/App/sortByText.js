import { apiInvoice } from "./apiInvoice";
import { modifySearch} from "./variables";

export const sortByText = (button, resultArea) => {
    button.addEventListener('click', (event) => {
        event.preventDefault();
        modifySearch(button.parentNode.querySelector('#invoice-search--field').value);
        apiInvoice(resultArea);
    })
}