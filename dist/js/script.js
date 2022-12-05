(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
    factory();
})((function () { 'use strict';

    const createInvoiceItemHtml = data => {
      return `<li>
            <span class="check" data-id="${data.id}"></span>
            <span class="id">#${data.id}</span>
            <span class="restaurant">
                <a href="${data.url}" target="_blank">
                    ${data.image}
                    <span>${data.name}</span> 
                </a>
            </span>
            <span class="status">
                <span class="${data.status}">${data.status}</span>
            </span>
            <span class="start-date">${data.startDate}</span>
            <span class="end-date">${data.endDate}</span>
            <span class="total">$${data.total}</span>
            <span class="fees">$${data.fees}</span>
            <span class="orders">${data.orders}</span>
        </li>`;
    };

    const createInvoiceItem = (data, appendPlace) => {
      let template = document.createElement('template');
      data = createInvoiceItemHtml(data).trim();
      template.innerHTML = data;
      appendPlace.appendChild(template.content.firstChild);
    };

    const removeListItem = area => {
      for (const item of area.querySelectorAll('li')) {
        area.removeChild(item);
      }
    };

    let status = '',
      page = 1,
      search = '',
      dateStart = '',
      dateEnd = '';
    const modifyStatus = value => {
      status = value;
    };
    const modifySearch = value => {
      search = value;
    };
    const modifyDateStart = value => {
      dateStart = value;
    };
    const modifyDateEnd = value => {
      dateEnd = value;
    };
    const modifyPage = value => {
      page = parseInt(value);
    };

    const checkInvoice = items => {
      for (const item of items) {
        item.addEventListener('click', event => {
          event.preventDefault();
          item.classList.toggle('active');
        });
      }
    };

    const createPaginationCount = (currentPage, maxPage) => {
      return `Page ${currentPage} of ${maxPage}`;
    };

    const createPaginationItem = (data, currentPage, appendPlace) => {
      let template = document.createElement('template');
      data = createPaginationHtml(data, currentPage).trim();
      template.innerHTML = data;
      appendPlace.appendChild(template.content.firstChild);
    };
    const createPaginationHtml = (page, currentPage) => {
      let className = 'invoice-change-page';
      if (page == currentPage) {
        className += ' active';
      }
      return `<li><a href="#${page}" class="${className}" data-page="${page}">${page}</a><li>`;
    };

    const sortByPage = (togglers, resultArea, navArea) => {
      const test = togglers.querySelectorAll('li a');
      for (const item of test) {
        item.addEventListener('click', event => {
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
        });
      }
    };

    const apiInvoice = (resultArea, navArea) => {
      resultArea.classList.add('loading');
      navArea.style.pointerEvents = 'none';
      const pagintaiontCount = resultArea.parentNode.querySelector('#pagination__count');
      const paginationNav = resultArea.parentNode.querySelector('#pagination__nav');
      removeListItem(resultArea);
      removeListItem(paginationNav);
      fetch(appCreateit.jsonurl + 'createit/ivoices/?status=' + status + '&page=' + page + '&search=' + search + '&dateStart=' + dateStart + '&dateEnd=' + dateEnd, {
        method: 'GET'
      }).then(response => response.json()).then(data => {
        if (!data.items.length) {
          resultArea.innerHTML = '<li class="nothing-found">Nothing found</li>';
          pagintaiontCount.innerText = '';
          return;
        }
        for (let el of Object.values(data.items)) {
          createInvoiceItem(el, resultArea);
        }
        for (let index = 1; index < data.maxPage + 1; index++) {
          createPaginationItem(index, data.currentPage, paginationNav);
        }
        pagintaiontCount.innerText = createPaginationCount(data.currentPage, data.maxPage);
      }).then(() => {
        resultArea.classList.remove('loading');
        checkInvoice(resultArea.querySelectorAll('.check'));
        navArea.style.pointerEvents = 'auto';
        sortByPage(paginationNav, resultArea, navArea);
      }).catch(error => {
        console.log(error);
      });
    };

    const sortByStatus = (togglers, resultArea, navArea) => {
      for (const item of togglers) {
        item.addEventListener('click', event => {
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
        });
      }
    };

    const sortByText = (button, resultArea, navArea) => {
      button.addEventListener('click', event => {
        event.preventDefault();
        const newSearch = button.parentNode.querySelector('#invoice-search--field').value;
        if (newSearch === search) {
          return;
        }
        modifyPage(1);
        modifySearch(newSearch);
        apiInvoice(resultArea, navArea);
      });
    };

    const sortByDate = (button, resultArea, navArea) => {
      button.addEventListener('click', event => {
        event.preventDefault();
        const newDateStart = button.parentNode.querySelector('#invoice-date-piceker--start').value;
        const newDateEnd = button.parentNode.querySelector('#invoice-date-piceker--end').value;
        if (dateStart == newDateStart && dateEnd == newDateEnd) {
          return;
        }
        if (newDateStart && !newDateEnd || !newDateStart && newDateEnd) {
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
    };

    const ajaxChangeStatus = (resultArea, navArea, ids) => {
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
      }).then(response => response.json()).then(data => {
        if (data.success) {
          modifyPage(1);
          apiInvoice(resultArea, navArea);
        }
      }).catch(error => {
        console.log(error);
      });
    };

    const changeStatus = (resultArea, navArea, buttonChangeStatus) => {
      buttonChangeStatus.addEventListener('click', event => {
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
        ajaxChangeStatus(resultArea, navArea, ids);
      });
    };

    const initApiInvoice = () => {
      const invoice = document.querySelector('#invoices');
      if (!invoice) {
        return;
      }
      const resultArea = invoice.querySelector('#result-invoice');
      const navArea = invoice.querySelector('.invoice-nav');
      const togglersStatus = invoice.querySelectorAll('#invoice-status .toggler-status');
      const buttonTextSearch = invoice.querySelector('#invoice-search--submit');
      const buttonDate = invoice.querySelector('#invoice-date-piceker--submit');
      const buttonChangeStatus = navArea.querySelector('#invoice-button-paid');
      apiInvoice(resultArea, navArea);
      sortByStatus(togglersStatus, resultArea, navArea);
      sortByText(buttonTextSearch, resultArea, navArea);
      sortByDate(buttonDate, resultArea, navArea);
      changeStatus(resultArea, navArea, buttonChangeStatus);
    };

    initApiInvoice();

}));
//# sourceMappingURL=script.js.map
