'use strict';

const baseUrl = 'https://restcountries.com/v2/name';

 function fetchArticles(query) {
     const requestParams = `${query}`;
     return fetch(`${baseUrl}/${requestParams}`)
         .then(res => res.json());
  }
export default { fetchArticles};