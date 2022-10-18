// export function fetchCountries(name) {
//   return fetch(
//     'https://restcountries.com/v2/name/' +
//       name +
//       '?fields=name,capital,population,flags,languages'
//   ).then(response => {
//     if (!response.ok) {
//       throw new Error(response.status);
//     }
//     return response.json();
//   });
// }

export const fetchCountries = async name => {
  try {
    const response = await fetch(
      'https://restcountries.com/v2/name/' +
        name +
        '?fields=name,capital,population,flags,languages'
    );
    const countries = await response.json();
    return countries;
  } catch (error) {
    console.log(error.message);
  }
};
