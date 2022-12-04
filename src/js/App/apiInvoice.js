import { createInvoiceItem } from "./createInvoiceItem"; 
import { removeInvoiceItem } from "./removeInvoiceItem";
import { status, page, search, dateStart, dateEnd } from "./variables";

export const apiInvoice = (resultArea) => {
    resultArea.classList.add('loading');
    removeInvoiceItem(resultArea);

    fetch('http://localhost/sklep/wp-json/createit/ivoices/?status='+status+'&page='+page+'&search='+search+'&dateStart='+dateStart+'&dateEnd='+dateEnd, { 
      	method: 'GET', 
    }) 
    .then((response) => response.json()) 
    .then((data) => { 
      	for(let el of Object.values(data.items)) {
        	createInvoiceItem(el, resultArea);
      	} 
    }) 
    .then(() => { 
      	resultArea.classList.remove('loading');
    }) 
    .catch((error) => {
      	console.log(error); 
    }); 


}