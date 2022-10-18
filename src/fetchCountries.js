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

    if (response.status == 200) {
      let json = await response.json();
      return json;
    }
  } catch (error) {
    throw new Error(response.status);
  }
};
