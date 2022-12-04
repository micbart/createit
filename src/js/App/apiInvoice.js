import { createInvoiceItem } from "./createInvoiceItem"; 
import { removeListItem } from "./removeListItem";
import { status, page, search, dateStart, dateEnd } from "./variables";
import { checkInvoice } from "./checkInvoice";
import { createPaginationCount } from "./createPaginationCount";
import { createPaginationItem } from "./createPagination";
import { sortByPage } from "./sortByPage";

export const apiInvoice = (resultArea,  navArea) => {
    resultArea.classList.add('loading');
    navArea.style.pointerEvents = 'none';
    const pagintaiontCount = resultArea.parentNode.querySelector('#pagination__count');
    const paginationNav = resultArea.parentNode.querySelector('#pagination__nav');
    removeListItem(resultArea);
    removeListItem(paginationNav);

    fetch('http://localhost/sklep/wp-json/createit/ivoices/?status='+status+'&page='+page+'&search='+search+'&dateStart='+dateStart+'&dateEnd='+dateEnd, { 
      	method: 'GET', 
    }) 
    .then((response) => response.json()) 
    .then((data) => { 
        console.log(page);
      	for (let el of Object.values(data.items)) {
        	createInvoiceItem(el, resultArea);
      	} 

        if (data.maxPage > 0) {
            for (let index = 1; index < data.maxPage+1; index++) {
                createPaginationItem(index, data.currentPage, paginationNav);
            }
            pagintaiontCount.innerText = createPaginationCount(data.currentPage, data.maxPage)
        } else {
            pagintaiontCount.innerText = '';
        }
    })
    .then(() => { 
      	resultArea.classList.remove('loading');
        checkInvoice(resultArea.querySelectorAll('.check'));
        navArea.style.pointerEvents = 'auto';
        sortByPage(paginationNav, resultArea, navArea);
    }) 
    .catch((error) => {
      	console.log(error); 
    }); 


}