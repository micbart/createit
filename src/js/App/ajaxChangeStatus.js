import { apiInvoice } from "./apiInvoice";
import { modifyPage } from "./variables";

export const ajaxChangeStatus = (resultArea,  navArea, ids) => {
    resultArea.classList.add('loading');
    navArea.style.pointerEvents = 'none';
   
    const data = new FormData();
            
    data.append('nonce', appCreateit.nonce);
    data.append('action', 'createit_change_status');
    data.append('ids', JSON.stringify(ids));

    fetch(appCreateit.ajaxurl, { 
      	method: 'POST',
        credentials: 'same-origin',
        body: data
    }) 
    .then((response) => response.json()) 
    .then((data) => { 
        if (data.success) {
            modifyPage(1);
            apiInvoice(resultArea, navArea);
        }
    })
    .catch((error) => {
      	console.log(error); 
    }); 
}