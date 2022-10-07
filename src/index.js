import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchCountries } from '../src/fetchCountries';

const inputCountry = document.querySelector('input');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

const type = () => {
  const name = inputCountry.value.trim();
  if (name.length >= 1) {
    fetchCountries(name)
      .then(countries => renderContriesList(countries))
      .catch(error =>
        Notiflix.Notify.failure('Oops, there is no country with that name')
      );
  }
};

// debounce
const DEBOUNCE_DELAY = 600;
var debounce = require('lodash.debounce');
var debounced = debounce(type, DEBOUNCE_DELAY);

inputCountry.addEventListener('input', debounced);
inputCountry.placeholder = 'type here';

// rendering results
function renderContriesList(countries) {
  // cleaning results
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';

  // detail rendering of 1 country
  if (countries.length === 1) {
    const markup = countries
      .map(country => {
        return `<img src="${country.flags.svg}" alt="" width="50px">
                <p style="display: inline; font-size: 24px"><b> ${country.name}</b></p>
                <p><b>Capital</b>: ${country.capital}</p>
                <p><b>Population</b>: ${country.population}</p>
                <p><b>Languages</b>: ${country.languages[0].name}</p>`;
      })
      .join('');
    countryInfo.innerHTML = markup;

    // coutries list rendering
  } else if (countries.length > 1 && countries.length <= 10) {
    const markup = countries
      .map(country => {
        return `<a href=""
                onclick="fetchCountries(name); renderContriesList(countries); console.log("SSSS")">
                <li>
                <img src="${country.flags.svg}" alt="" width="50px">
                <p style="display: inline"> ${country.name}</p>
                </li>
                </a>
                `;
      })
      .join('');
    countryList.innerHTML = markup;

    // too many results
  } else {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  }
}
