// const BASE_URL = 'https://restcountries.com/#api-endpoints-v3-name';
// function fetchCountries(countryToSearch) {
//     return fetch(`${BASE_URL}/${countryToSearch}`)
//         .then(response => response.json());
// }

//XMLHTTP old style request

// const req = new XMLHttpRequest()
// req.onload = function () {
//     console.log('Loaded');
//     const data = JSON.parse(this.responseText);
    
//     console.log(data);
// }
// req.onerror = function () {
//     console.log('Error');
//     console.log(this);
// }

// req.open('GET', 'https://restcountries.com/v3.1/all');
// req.send();

// fetch('https://restcountries.com/v3.1/all')
//     .then(res => {
//         console.log('resolved', res);
//         return res.json()
//     })
//     .then(data => console.log('json done', data))
//     .catch((e) => {
//         console.log('error', e);
// })
'use strict';

const baseUrl = 'https://restcountries.com/v3.1/name/';
export default {
  fetchArticles(query) {
    const requestParams = `${query}`;
    return fetch(baseUrl + requestParams).then(res => res.json());
  },
};