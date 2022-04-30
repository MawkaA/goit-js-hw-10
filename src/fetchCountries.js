const BASE_URL = 'https://restcountries.com/#api-endpoints-v3-name';
function fetchCountries(countryToSearch) {
    return fetch(`${BASE_URL}/${countryToSearch}`)
        .then(response => response.json());
}