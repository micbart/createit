import { ajaxChangeStatus } from "./ajaxChangeStatus";

export const changeStatus = (resultArea, navArea, buttonChangeStatus) => {
    buttonChangeStatus.addEventListener('click', (event) => {
        event.preventDefault();
        const items = resultArea.querySelectorAll('li .check.active');
        
        if (!items.length) {
            alert('Check elements to change');
            return;
        }
        
        let ids = [];

        for (const iterator of items) {
            ids.push(parseInt(iterator.dataset.id));
        }

        if (!ids.length) {
            return;
        }

        ajaxChangeStatus(resultArea,  navArea, ids);
    });
}