import { apiInvoice } from "./apiInvoice";
import { modifyPage } from "./variables";

export const sortByPage = (togglers, resultArea, navArea) => {
    const test = togglers.querySelectorAll('li a');
    for (const item of test) {
        item.addEventListener('click', (event) => {
            event.preventDefault();

            if (item.classList.contains('active')) {
                return;
            }

            for (const item of test) {
                item.classList.remove('active');
            }

            item.classList.add('active');
            modifyPage(item.dataset.page);
            apiInvoice(resultArea, navArea);
        })
    }
}