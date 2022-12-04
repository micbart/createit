(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
    factory();
})((function () { 'use strict';

    const createInvoiceItemHtml = data => {
      return `<li>
            <span class="check" data-id="${data.id}"></span>
            <span class="id">${data.id}</span>
            <span class="restaurant">
                <a href="${data.url}" target="_blank">
                    <img src="${data.image}">
                    <span>${data.name}</span> 
                </a>
            </span>
            <span class="status">${data.status}</span>
            <span class="start-date">${data.startDate}</span>
            <span class="end-date">${data.endDate}</span>
            <span class="total">${data.total}</span>
            <span class="fees">${data.fees}</span>
            <span class="orders">${data.orders}</span>
        </li>`;
    };

    const createInvoiceItem = (data, appendPlace) => {
      let template = document.createElement('template');
      data = createInvoiceItemHtml(data).trim();
      template.innerHTML = data;
      appendPlace.appendChild(template.content.firstChild);
    };

    const removeInvoiceItem = area => {
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

    const apiInvoice = resultArea => {
      resultArea.classList.add('loading');
      removeInvoiceItem(resultArea);
      fetch('http://localhost/sklep/wp-json/createit/ivoices/?status=' + status + '&page=' + page + '&search=' + search + '&dateStart=' + dateStart + '&dateEnd=' + dateEnd, {
        method: 'GET'
      }).then(response => response.json()).then(data => {
        for (let el of Object.values(data.items)) {
          createInvoiceItem(el, resultArea);
        }
      }).then(() => {
        resultArea.classList.remove('loading');
      }).catch(error => {
        console.log(error);
      });
    };

    const sortByStatus = (togglers, resultArea) => {
      for (const item of togglers) {
        item.addEventListener('click', event => {
          event.preventDefault();
          for (const item of togglers) {
            item.classList.remove('active');
          }
          item.classList.add('active');
          modifyStatus(item.dataset.status);
          apiInvoice(resultArea);
        });
      }
    };

    const sortByText = (button, resultArea) => {
      button.addEventListener('click', event => {
        event.preventDefault();
        modifySearch(button.parentNode.querySelector('#invoice-search--field').value);
        apiInvoice(resultArea);
      });
    };

    const initApiInvoice = () => {
      const invoice = document.querySelector('#invoices');
      if (!invoice) {
        return;
      }
      const resultArea = invoice.querySelector('#result-invoice');
      const togglersStatus = invoice.querySelectorAll('#invoice-status .toggler-status');
      const buttonTextSearch = invoice.querySelector('#invoice-search--submit');
      apiInvoice(resultArea);
      sortByStatus(togglersStatus, resultArea);
      sortByText(buttonTextSearch, resultArea);
    };

    initApiInvoice();

}));
//# sourceMappingURL=script.js.map
