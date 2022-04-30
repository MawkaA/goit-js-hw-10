import './css/styles.css';
import debounce from 'lodash.debounce'
import Notiflix from 'notiflix'
import  fetchCountries from './fetchCountries'
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
refs.countryInput.addEventListener('input', debounce(onCountryInput, DEBOUNCE_DELAY))

function onCountryInput() {
    countryToSearch = refs.countryInput.value;
    console.log(countryToSearch);

    fetchCountries(countryToSearch)
        .then(data => {
            if (data.length > 10) {
                alertTooManyMatches();
                clearMarkup()
            } else if (data.status === 404) {
                alertWrongName();
                clearMarkup()
            } else if (data.length === 1) {
                buildListMarkup(data, country);
            } else if (data.length <= 10) {
                buildListMarkup(data, countries);
            }
        })
        .catch(Error => {
            Error({
                text: "You must enter query parameters!"
            });
            console.log(Error)
            clearMarkup()
        });
}

function buildListMarkup(items, template) {
  const markup = items.map(count => template(count)).join();
  refs.countryList.insertAdjacentHTML('afterbegin', markup)
}

function alertWrongName() {
  Notiflix.Notify.failure('Oops, there is no country with that name')
}

function alertTooManyMatches() {
    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.')
}
