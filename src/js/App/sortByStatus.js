import { apiInvoice } from "./apiInvoice";
import { modifyStatus} from "./variables";

export const sortByStatus = (togglers, resultArea) => {
    for (const item of togglers) {
        item.addEventListener('click', (event) => {
            event.preventDefault();

            for (const item of togglers) {
                item.classList.remove('active');
            }

            item.classList.add('active');

            modifyStatus(item.dataset.status);
            apiInvoice(resultArea);
        })
    }
}