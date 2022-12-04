import { createInvoiceItemHtml } from "./createInvoiceItemHtml";

export const createInvoiceItem = (data, appendPlace) => { 
    let template = document.createElement('template'); 
    data = createInvoiceItemHtml(data).trim(); 
    template.innerHTML = data; 
    appendPlace.appendChild(template.content.firstChild); 
}