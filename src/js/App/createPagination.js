export const createPaginationItem = (data, currentPage, appendPlace) => { 
    let template = document.createElement('template'); 
    data = createPaginationHtml(data, currentPage).trim(); 
    template.innerHTML = data; 
    appendPlace.appendChild(template.content.firstChild); 
}

const createPaginationHtml = (page, currentPage) => {
    let className = 'invoice-change-page';
    if (page == currentPage) {
        className += ' active';
    }
    return `<li><a href="#${page}" class="${className}" data-page="${page}">${page}</a><li>`;
}
