const BASE_URL = 'https://api.thecatapi.com/v1';
const API_KEY = 'live_lPe764UypqgPCYsOgInObmavNiawcZTZvUxTvDlSwt3esNPOiLbguAl2wNJJ9lsF';

function fetchBreeds() {
  const url = `${BASE_URL}/breeds`;
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }

    return response.json();
  });
}

function fetchCatByBreed(breedId) {
  const url = `${BASE_URL}/images/search?api_key=${API_KEY}&breed_ids=${breedId}`;
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }

    return response.json();
  });
}

function renderBreedsList(selector, markup) {
  selector.insertAdjacentHTML('beforeend', markup);
}

function createListElements(arr) {
  return arr
    .map(({ name, id }) => `<option value="${id}">${name}</option>`)
    .join('');
}

function renderCatInfo(selector, markup) {
  selector.innerHTML = markup;
}

function createMurkup({ url, breeds: [{ name, description, temperament }] }) {
  return `<img src="${url}" alt="${name}" width=300>
      <div>
      <h2>${name}</h2>
      <p>${description}</p>
      <p><b>Temperament:</b> ${temperament}</p>
      </div>`;
}

export {
  fetchBreeds,
  createListElements,
  renderBreedsList,
  fetchCatByBreed,
  createMurkup,
  renderCatInfo,
};
