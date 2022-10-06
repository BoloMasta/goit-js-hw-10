import './css/styles.css';
import Notiflix from 'notiflix';

const inputCountry = document.querySelector('input');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;

const test = () => {
  console.log('test');
};

var debounce = require('lodash.debounce');
var debounced = debounce(test, DEBOUNCE_DELAY);

document.querySelector('button').addEventListener('click', debounced);

inputCountry.addEventListener('input', () => {
  fetchCountries(name)
    .then(users => renderUserList(users))
    .catch(error => console.log(error));
});

Notiflix.Notify.failure('Qui timide rogat docet negare');
Notiflix.Notify.info('Cogito ergo sum');

const searchParams = new URLSearchParams({
  _limit: 2,
  _sort: 'name',
  _fields: 'name,capital,population,flags.svg,languages',
});

console.log(searchParams.toString());

document.querySelector('button').addEventListener('click', () => {
  fetchCountries()
    .then(countries => renderContriesList(countries))
    .catch(error => console.log(error));
});

let find = '';

inputCountry.addEventListener('input', () => {
  find = inputCountry.value;
});

function fetchCountries(name) {
  // GET https://restcountries.com/v2/name/{name}
  // Accept: application/json
  // ?fields={name.official},{capital},{population},{flags.svg},{languages}

  return fetch(
    'https://restcountries.com/v2/name/' +
      find +
      '?fields=name,capital,population,flags,languages'
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

function renderContriesList(countries) {
  const markup = countries
    .map(country => {
      return `<li>
            <p><b>Country name</b>: ${country.name}</p>
            <p><b>Capital</b>: ${country.capital}</p>
            <p><b>Population</b>: ${country.population}</p>
            <p><b>flags.svg</b>: ${country.flags.svg}</p>
            <p><b>Languages</b>: ${country.languages[0].name}</p>
          </li>`;
    })
    .join('');
  countryList.innerHTML = markup;
}
// flags.svg
// https://restcountries.com/v2/name/{name}


