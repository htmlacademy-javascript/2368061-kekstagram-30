import { createRandomIdFromRangeGenerator, debounce } from './util.js';
import { renderThumbnails } from './thumbnail-gallery.js';

const RANDOM_THUMBNAILS_MAX = 10;
const RERENDER_DELAY = 500;
const ButtonId = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

const filters = document.querySelector('.img-filters');
const pictureContainer = document.querySelector('.pictures');

let currentButtonId = ButtonId.DEFAULT;

const changeActiveFilterButton = (clickedButton) => {
  if (clickedButton.id !== currentButtonId) {
    const activeButton = filters.querySelector(`#${currentButtonId}`);

    currentButtonId = clickedButton.id;
    activeButton.classList.remove('img-filters__button--active');
    clickedButton.classList.add('img-filters__button--active');
  }
};

const getRandomPictures = (pictures) => {
  const generateRandomIndex = createRandomIdFromRangeGenerator(0, pictures.length - 1);
  const randomPicturesCount = Math.min(RANDOM_THUMBNAILS_MAX, pictures.length);

  return Array.from({ length: randomPicturesCount }, () => pictures[generateRandomIndex()]);
};

const getDiscussedPictures = (pictures) => {
  const compareCommentCount = (a, b) => b.comments.length - a.comments.length;

  return [...pictures].sort(compareCommentCount);
};

const btnIdToFilterHandler = {
  [ButtonId.DEFAULT]: (pics) => pics,
  [ButtonId.RANDOM]: getRandomPictures,
  [ButtonId.DISCUSSED]: getDiscussedPictures
};

const removeThumbnails = () => {
  const thumbnails = pictureContainer.querySelectorAll('a.picture');

  thumbnails.forEach((thumbnail) => {
    thumbnail.remove();
  });
};

const filterThumbnails = (pictures, button) => {
  const filteredPictures = btnIdToFilterHandler[button.id](pictures);

  removeThumbnails();
  renderThumbnails(filteredPictures);
};

const debouncedFilterThumbnails = debounce(filterThumbnails, RERENDER_DELAY);

const setThumbnailFilters = (pictures) => {
  filters.classList.remove('img-filters--inactive');

  filters.addEventListener('click', (evt) => {
    const button = evt.target.closest('button.img-filters__button');

    if (button?.id === ButtonId.RANDOM || button?.id !== currentButtonId) {
      changeActiveFilterButton(button);
      debouncedFilterThumbnails(pictures, button);
    }
  });
};

export { setThumbnailFilters };
