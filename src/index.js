import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';
import { formatNumberToK } from './number-formatting';
import debounce from 'lodash.debounce';

const inputCountry = document.querySelector('input');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
const clearBtn = document.querySelector('.clearBtn');

const DEBOUNCE_DELAY = 600;

// cleaning results
const clearResult = () => {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
};

// fetch from input
const typingFn = async () => {
  const name = inputCountry.value.trim().toLowerCase();

  if (name.length >= 1) {
    clearBtn.classList.remove('is-hidden');

    const countries = await fetchCountries(name);

    if (countries) {
      countries.filter(country => country.name.toLowerCase().includes(name));
      renderCountriesList(countries);
    } else {
      return Notiflix.Notify.failure('Country not found!');
    }
  } else {
    clearResult();
  }
};

// debounce
const debounced = debounce(typingFn, DEBOUNCE_DELAY);
inputCountry.addEventListener('input', debounced);
inputCountry.placeholder = 'type here';

// returnOneCountry
function returnOneCountry(countries) {
  const singleCountry = countries[0];
  const { flags, name, capital, population, languages } = singleCountry;

  const returnMarkup = () => {
    const languagesFormatted = languages.map(lang => lang.name).join(', ');

    return `
          <img src='${flags.svg}' alt='flag of ${name}'>
          <p><b>${name}</b></p>
          <p><b>Capital</b>: ${capital}</p>
          <p><b>Population</b>: ${formatNumberToK(population)}</p>
          <p><b>Languages</b>: ${languagesFormatted}</p>`;
  };

  countryInfo.innerHTML = returnMarkup();
}

// returnMultipleCountries
function returnMultipleCountries(countries) {
  const returnMarkup = () => {
    return countries
      .map(
        ({ name, flags }) =>
          `
      <a href='#'>
        <li data-country='${name}'>
          <img src='${flags.svg}' alt='flag of ${name}' width='50px'>
          <p style='display: inline'> ${name}</p>
        </li>
      </a>
      `
      )
      .join('');
  };

  countryList.innerHTML = returnMarkup();

  // go into details
  function linkToDetails() {
    let matchingCountries = [];
    countries?.find(country => {
      if (country.name === event.currentTarget.dataset.country) {
        matchingCountries.push(country);
      }
    });

    renderCountriesList(matchingCountries);
  }

  // if more than 1 country -> generate possibility to show result earlier
  for (const country of countries) {
    countryList
      .querySelector(`[data-country="${country.name}"]`)
      .addEventListener('click', linkToDetails);
  }
}

function renderCountriesList(countries) {
  clearResult();

  if (countries.length === 1) {
    returnOneCountry(countries);
  } else if (countries.length > 1 && countries.length <= 10) {
    returnMultipleCountries(countries);
  } else {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  }
}

// clear button
clearBtn.addEventListener('click', () => {
  inputCountry.value = '';
  clearResult();
  inputCountry.focus();
  clearBtn.classList.add('is-hidden');
});
