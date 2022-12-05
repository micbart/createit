import { apiInvoice } from "./apiInvoice";
import { modifyDateStart, modifyDateEnd, dateStart, dateEnd, modifyPage} from "./variables";

export const sortByDate = (button, resultArea, navArea) => {
    button.addEventListener('click', (event) => {
        event.preventDefault();
        const newDateStart = button.parentNode.querySelector('#invoice-date-piceker--start').value;
        const newDateEnd = button.parentNode.querySelector('#invoice-date-piceker--end').value;

        if (dateStart == newDateStart && dateEnd == newDateEnd) {
            return;
        }

        if ((newDateStart && !newDateEnd) || (!newDateStart && newDateEnd)) {
            alert('Correct date');
            return;
        }

        if (newDateStart <= newDateEnd) {
            modifyPage(1);
            modifyDateStart(newDateStart);
            modifyDateEnd(newDateEnd);
            apiInvoice(resultArea, navArea);
        } else {
            alert('Please correct the date');
            return;
        }
    });
}