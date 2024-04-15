import { fetchBreeds, fetchCatByBreed, createListElements, createMurkup, renderBreedsList, renderCatInfo } from "./js/cat-api";
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loaderMsg = document.querySelector('.loader');
// const errorMsg = document.querySelector('.error');

const visuallyHidden = 'visually-hidden';

breedSelect.addEventListener('change', onChangeSelect);

fetchBreeds()
  .then(breeds => {
    removeCssClass(breedSelect, visuallyHidden);
    addCssClass(loaderMsg, visuallyHidden);

    const breedsList = createListElements(breeds);

    renderBreedsList(breedSelect, breedsList);

    new SlimSelect({select: '#selectElement'});
  })
  .catch(error => {
    addCssClass(loaderMsg, visuallyHidden);
    // removeCssClass(errorMsg, visuallyHidden);

    Notiflix.Report.failure(
      `${error}`,
      'Oops! Something went wrong! Try reloading the page!',
      'Okey'
    );
  });

function onChangeSelect(evt) {
  removeCssClass(loaderMsg, visuallyHidden);
  // addCssClass(errorMsg, visuallyHidden);
  addCssClass(catInfo, visuallyHidden);

  const selectedBreed = evt.currentTarget.value;
  console.log(selectedBreed);

  fetchCatByBreed(selectedBreed)
    .then(response => {
      response.map(cat => {
        addCssClass(loaderMsg, visuallyHidden);
        removeCssClass(catInfo, visuallyHidden);

        const markup = createMurkup(cat);

        renderCatInfo(catInfo, markup);
      });
    })
    .catch(error => {
      addCssClass(loaderMsg, visuallyHidden);
      // removeCssClass(errorMsg, visuallyHidden);
      Notiflix.Report.failure(
        `${error}`,
        'Oops! Something went wrong! Try reloading the page!',
        'Okey'
      );
    });
}

function addCssClass(selector, cssClass) {
  selector.classList.add(`${cssClass}`);
}

function removeCssClass(selector, cssClass) {
  selector.classList.remove(`${cssClass}`);
}
