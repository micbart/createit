export let  status = '', page = 1, search = '', dateStart = '', dateEnd = '';

export const modifyStatus = (value) => {
    status = value; 
}

export const modifySearch = (value) => {
    search = value;
}

export const modifyDateStart = (value) => {
    dateStart = value;
}

export const modifyDateEnd = (value) => {
    dateEnd = value;
}

export const modifyPage = (value) => {
    page = parseInt(value);
}