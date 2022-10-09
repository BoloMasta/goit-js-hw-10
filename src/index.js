import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchCountries } from '../src/fetchCountries';

const inputCountry = document.querySelector('input');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

// clear button
const clearBtn = document.querySelector('.clearBtn');
clearBtn.addEventListener('click', () => {
  inputCountry.value = '';
  clearResult();
  inputCountry.focus();
});

// cleaning results
const clearResult = () => {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
};

function isName(value) {
  if (country.name.includes(value)) {
    return value;
  }
}

const type = () => {
  const name = inputCountry.value.trim();
  if (name.length >= 1) {
    fetchCountries(name)
      // filtering names that contain entered string
      .then(countries =>
        countries.filter(country => country.name.toLowerCase().includes(name))
      )

      // rendering results
      .then(countries => renderContriesList(countries))

      // no result
      .catch(() =>
        Notiflix.Notify.failure('Oops, there is no country with that name')
      );
  } else {
    clearResult();
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
  clearResult();

  // detail rendering of 1 country
  if (countries.length === 1) {
    const markup = countries
      .map(country => {
        // creating array of languages
        let languages = [];
        country.languages.forEach(language => {
          languages.push(language.name);
        });

        return `<img src="${country.flags.svg}" alt="flag of ${
          country.name
        }" width="60px">
                <p style="display: inline; font-size: 24px"><b> ${
                  country.name
                }</b></p>
                <p><b>Capital</b>: ${country.capital}</p>
                <p><b>Population</b>: ${country.population}</p>
                <p><b>Languages</b>: ${languages.join(', ')}</p>`;
      })
      .join('');
    countryInfo.innerHTML = markup;

    // coutries list rendering
  } else if (countries.length > 1 && countries.length <= 10) {
    const markup = countries
      .map(country => {
        return `<a href="#">
                <li data-country="${country.name}">
                <img src="${country.flags.svg}" alt="flag of ${country.name}" width="50px">
                <p style="display: inline"> ${country.name}</p>
                </li>
                </a>`;
      })
      .join('');
    countryList.innerHTML = markup;

    // go into details
    function linkToDetails() {
      countries = Array(
        countries.find(
          element => element.name === event.currentTarget.dataset.country
        )
      );
      renderContriesList(countries);
    }

    for (let i = 0; i < countries.length; i++) {
      countryList.children[i].children[0].addEventListener(
        'click',
        linkToDetails
      );
    }

    // too many results
  } else {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  }
}
