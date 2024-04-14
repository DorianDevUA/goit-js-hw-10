const BASE_URL = 'https://api.thecatapi.com/v1';

function fetchBreeds() {
  return fetch(`${BASE_URL}/breeds`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText)
      }

      return response.json();
  })
}

function fetchCatByBreed(breedId) {

}

export { fetchBreeds, fetchCatByBreed };
