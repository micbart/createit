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

    fetch(appCreateit.jsonurl+'createit/ivoices/?status='+status+'&page='+page+'&search='+search+'&dateStart='+dateStart+'&dateEnd='+dateEnd, { 
      	method: 'GET', 
    }) 
    .then((response) => response.json()) 
    .then((data) => { 

        if (!data.items.length) {
            resultArea.innerHTML = '<li class="nothing-found">Nothing found</li>';
            pagintaiontCount.innerText = '';
            return;
        }

      	for (let el of Object.values(data.items)) {
        	createInvoiceItem(el, resultArea);
      	} 

        for (let index = 1; index < data.maxPage+1; index++) {
            createPaginationItem(index, data.currentPage, paginationNav);
        }
        pagintaiontCount.innerText = createPaginationCount(data.currentPage, data.maxPage);
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