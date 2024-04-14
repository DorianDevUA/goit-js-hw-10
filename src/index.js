import { fetchBreeds } from "./js/cat-api";

const breedSelect = document.querySelector('.breed-select');

fetchBreeds()
  .then(breeds => {
    const breedsList = createListElements(breeds);
    renderBreedsList(breedSelect, breedsList);
  })
  .catch(error => console.log)

function createListElements(arr) {
  return arr
    .map(({ name, id }) => `<option value="${id}">${name}</option>`)
    .join('');
}

function renderBreedsList(selector, markup) {
  selector.insertAdjacentHTML('beforeend', markup)
}
