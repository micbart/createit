import { apiInvoice } from "./apiInvoice";
import { modifyStatus, modifyPage } from "./variables";

export const sortByStatus = (togglers, resultArea, navArea) => {
    for (const item of togglers) {
        item.addEventListener('click', (event) => {
            event.preventDefault();

            if (item.classList.contains('active')) {
                return;
            }

            for (const item of togglers) {
                item.classList.remove('active');
            }

            item.classList.add('active');
            modifyPage(1);
            modifyStatus(item.dataset.status);
            apiInvoice(resultArea, navArea);
        })
    }
}