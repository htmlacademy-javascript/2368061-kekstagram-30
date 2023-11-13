import { createRandomIdFromRangeGenerator, debounce } from './util.js';

const RANDOM_THUMBNAILS_MAX = 10;
const RERENDER_DELAY = 500;

const filters = document.querySelector('.img-filters');
const pictureContainer = document.querySelector('.pictures');
const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');

const createThumbnail = ({ id, url, description, likes, comments }) => {
  const thumbnail = thumbnailTemplate.cloneNode(true);

  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.querySelector('.picture__img').alt = description;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  thumbnail.dataset.thumbnailId = id;

  return thumbnail;
};

const renderThumbnails = (pictures) => {
  const fragment = document.createDocumentFragment();

  pictures.forEach((picture) => {
    const thumbnail = createThumbnail(picture);
    fragment.append(thumbnail);
  });

  pictureContainer.append(fragment);
};

const debouncedRenderThumbnails = debounce(renderThumbnails, RERENDER_DELAY);

const changeActiveFilterButton = (clickedFilterButton) => {
  if (!clickedFilterButton.classList.contains('img-filters__button--active')) {
    const activeFilterButton = filters.querySelector('.img-filters__button--active');

    activeFilterButton.classList.remove('img-filters__button--active');
    clickedFilterButton.classList.add('img-filters__button--active');
  }
};

const removeThumbnails = () => {
  const thumbnails = pictureContainer.querySelectorAll('a.picture');

  thumbnails.forEach((thumbnail) => {
    thumbnail.remove();
  });
};

const getRandomPictures = (pictures) => {
  const generateRandomIndex = createRandomIdFromRangeGenerator(0, pictures.length - 1);

  return Array.from({ length: RANDOM_THUMBNAILS_MAX }, () => pictures[generateRandomIndex()]);
};

const getDiscussedPictures = (pictures) => {
  const compareCommentCount = (a, b) => b.comments.length - a.comments.length;

  return pictures.slice().sort(compareCommentCount);
};

const setThumbnailFilters = (pictures) => {
  filters.classList.remove('img-filters--inactive');

  filters.addEventListener('click', (evt) => {
    const filterButton = evt.target.closest('button.img-filters__button');

    if (filterButton) {
      removeThumbnails();
      changeActiveFilterButton(filterButton);

      const idToFilterFunction = {
        'filter-default': (pics) => pics,
        'filter-random': getRandomPictures,
        'filter-discussed': getDiscussedPictures,
      };
      const filteredPictures = idToFilterFunction[filterButton.id](pictures);

      debouncedRenderThumbnails(filteredPictures);
    }
  });
};

export { renderThumbnails, setThumbnailFilters };
