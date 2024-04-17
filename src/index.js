import {
  fetchBreeds,
  fetchCatByBreed,
  createListElements,
  createMurkup,
  renderBreedsList,
  renderCatInfo,
} from './js/cat-api';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loaderField = document.querySelector('.loader');
// const errorField = document.querySelector('.error');
const errorMsg = 'Oops! Something went wrong! Try reloading the page!';

const visuallyHidden = 'visually-hidden';

breedSelect.addEventListener('change', onChangeSelect);

fetchBreeds()
  .then(breeds => {
    removeCssClass(breedSelect, visuallyHidden);
    addCssClass(loaderField, visuallyHidden);

    const breedsList = createListElements(breeds);

    renderBreedsList(breedSelect, breedsList);

    new SlimSelect({ select: '#selectElement' });
  })
  .catch(error => {
    addCssClass(loaderField, visuallyHidden);
    // removeCssClass(errorField, visuallyHidden);

    Notiflix.Report.failure(`${error}`, errorMsg, 'Okey');
  });

function onChangeSelect(evt) {
  removeCssClass(loaderField, visuallyHidden);
  // addCssClass(errorField, visuallyHidden);
  addCssClass(catInfo, visuallyHidden);

  const selectedBreed = evt.currentTarget.value;
  console.log(selectedBreed);

  fetchCatByBreed(selectedBreed)
    .then(response => {
      addCssClass(loaderField, visuallyHidden);
      removeCssClass(catInfo, visuallyHidden);

      const [cat] = response;
      const markup = createMurkup(cat);

      renderCatInfo(catInfo, markup);
    })
    .catch(error => {
      addCssClass(loaderField, visuallyHidden);
      // removeCssClass(errorField, visuallyHidden);
      Notiflix.Report.failure(`${error}`, errorMsg, 'Okey');
    });
}

function addCssClass(selector, cssClass) {
  selector.classList.add(`${cssClass}`);
}

function removeCssClass(selector, cssClass) {
  selector.classList.remove(`${cssClass}`);
}
