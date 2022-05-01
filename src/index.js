import './css/styles.css';
import debounce from 'lodash.debounce'
import Notiflix from 'notiflix'
import API from './fetchCountries'
import listOfContries  from './countries/listOfContries.hbs'
import country from './countries/country.hbs'

const refs = {
countryInput:document.querySelector('#search-box'),
countryList :document.querySelector('.country-list'),
countryInfo :document.querySelector('.country-info')
}

// очистка инпута при ошибке
function clearMarkup() {
    refs.countryInfo.innerHTML = '';
    refs.countryList.innerHTML = '';
}
//---------

let countryToSearch = '';

const DEBOUNCE_DELAY = 300;
refs.countryInput.addEventListener('input', debounce(onCountryInput, DEBOUNCE_DELAY));
function onCountryInput(e) {
    e.preventDefault();
    countryToSearch = refs.countryInput.value;
    console.log(countryToSearch);
    
     API.fetchArticles(countryToSearch)
        .then(checkingNumberOfCountries)
        .catch(Error => {
            clearMarkup();
            console.log(Error)
        });
}
function checkingNumberOfCountries(countries) {
            if (countries.length > 10) {
                alertTooManyMatches();
                clearMarkup()
            }if (countries.status === 404) {
                alertWrongName();
                clearMarkup()
            }if (countries.length === 1) {
                clearMarkup();
                renderMarkup(country, countries[0]);
            }if (countries.length <= 10 && countries.length > 1) {
                clearMarkup();
                renderMarkup(listOfContries, countries);
            }
        
}
   function renderMarkup(template, countries) {
  const markup = template(countries);
   refs.countryInfo.insertAdjacentHTML('beforeend', markup);
}

function alertWrongName() {
  Notiflix.Notify.failure('Oops, there is no country with that name')
}

function alertTooManyMatches() {
    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.')
}
