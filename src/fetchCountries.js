export function fetchCountries(name) {
  return fetch(
    'https://restcountries.com/v2/name/' +
      name +
      '?fields=name,capital,population,flags,languages'
  ).then(response => {
    if (!response.ok) {
      console.log(Error(response.status));
      throw new Error(response.status);
    }
    return response.json();
  });
}
