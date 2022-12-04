import { apiInvoice } from "./apiInvoice";
import { modifySearch, search, modifyPage} from "./variables";

export const sortByText = (button, resultArea, navArea) => {
    button.addEventListener('click', (event) => {
        event.preventDefault();
        const newSearch = button.parentNode.querySelector('#invoice-search--field').value;
        if (newSearch === search) {
            return;
        }
        modifyPage(1);
        modifySearch(newSearch);
        apiInvoice(resultArea, navArea);
    })
}