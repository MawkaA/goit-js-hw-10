import './css/styles.css';
import debounce from 'lodash.debounce'
import Notiflix from 'notiflix'
import { fetchCountries } from './fetchCountries'

const refs = {
countryInput:document.querySelector('#search-box'),
countryList :document.querySelector('.country-list'),
countryInfo :document.querySelector('.country-info')
}
const linkData = 'https://restcountries.com/#api-endpoints-v3-name';

const DEBOUNCE_DELAY = 300;
refs.countryInput.addEventListener('input', debounce(onCountryInput, DEBOUNCE_DELAY))

// onCountryInput функция добавить



function alertWrongName() {
  Notiflix.Notify.failure('Oops, there is no country with that name')
}

function alertTooManyMatches() {
  Notiflix.Notify.info('Too many matches found. Please enter a more specific name.')
}
