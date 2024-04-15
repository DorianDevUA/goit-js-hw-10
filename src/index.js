import { fetchBreeds, fetchCatByBreed, renderBreedsList, renderCatInfo } from "./js/cat-api";

const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loaderMsg = document.querySelector('.loader');
const errorMsg = document.querySelector('.error');

breedSelect.addEventListener('change', onChangeSelect);

fetchBreeds()
  .then(breeds => {
    loaderMsg.classList.add('visually-hidden');
    
    const breedsList = createListElements(breeds);
    renderBreedsList(breedSelect, breedsList);
  })
  .catch(error => console.log(error));

function createListElements(arr) {
  return arr
    .map(({ name, id }) => `<option value="${id}">${name}</option>`)
    .join('');
}

// function renderBreedsList(selector, markup) {
//   selector.insertAdjacentHTML('beforeend', markup)
// }

function onChangeSelect(evt) {
  loaderMsg.classList.remove('visually-hidden');
  const selectedBreed = evt.currentTarget.value;
  console.log(selectedBreed);

  fetchCatByBreed(selectedBreed)
    .then(response => {
      response.map(cat => {
        loaderMsg.classList.add('visually-hidden');
        const markup = createMurkup(cat);
        renderCatInfo(catInfo, markup);
      });
    })
    .catch(error => console.log(error));
}

function createMurkup({ url, breeds }) {
  const markup = breeds.map(({ name, description, temperament }) => {
    return `<img src="${url}" alt="${name}" width=300>
      <div>
      <h2>${name}</h2>
      <p>${description}</p>
      <p><b>Temperament:</b> ${temperament}</p>
      </div>`;
  });

  return markup;
}

// function renderCatInfo(selector, markup) {
//   selector.innerHTML = markup;
// }
