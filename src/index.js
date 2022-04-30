import './css/styles.css';
import debounce from 'lodash.debounce'
import Notiflix from 'notiflix'
import res from './fetchCountries'
import countries  from './countries/countries.hbs'
import country from './countries/country.hbs'

const refs = {
countryInput:document.querySelector('#search-box'),
countryList :document.querySelector('.country-list'),
countryInfo :document.querySelector('.country-info')
}

// очистка инпута при ошибке
function clearMarkup() {
  refs.countryInfo.innerHTML = '';
}
//---------

let countryToSearch = '';

const DEBOUNCE_DELAY = 300;
refs.countryInput.addEventListener('input', debounce(onCountryInput, DEBOUNCE_DELAY));
function onCountryInput(e) {
    e.preventDefault();
    countryToSearch = refs.countryInput.value;
    console.log(countryToSearch);
    
     res.fetchArticles(countryToSearch)
        .then(data => {
            if (data.length > 10) {
                alertTooManyMatches();
                clearMarkup()
            }if (data.status === 404) {
                alertWrongName();
                clearMarkup()
            } if (data.length === 1) {
                clearMarkup();
                buildItemMarkup(country, data[0]);
            } else if (data.length <= 10 && data.length > 1) {
                clearMarkup();
                buildListMarkup(countries, data);
            }
        })
        .catch(Error => {
            clearMarkup();
            console.log(Error)
        });
}
   function buildListMarkup(template,countries) {
        const markup = countries.map(county => template(country)).join();
       refs.countryList.insertAdjacentHTML('beforeend', markup);
   }
function buildItemMarkup(template, country) {
    const markup = template(country);
    refs.countryInfo.insertAdjacentHTML('beforeend', markup);
}
function alertWrongName() {
  Notiflix.Notify.failure('Oops, there is no country with that name')
}

function alertTooManyMatches() {
    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.')
}
