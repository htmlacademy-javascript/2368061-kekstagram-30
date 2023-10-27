const pictureContainer = document.querySelector('.pictures');
const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');

const createThumbnail = ({ url, description, likes, comments }, index) => {
  const thumbnail = thumbnailTemplate.cloneNode(true);

  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.querySelector('.picture__img').alt = description;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  thumbnail.setAttribute('data-index', index);

  return thumbnail;
};

const appendThumbnails = (pictures) => {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < pictures.length; i++) {
    const thumbnail = createThumbnail(pictures[i], i);
    fragment.append(thumbnail);
  }

  pictureContainer.append(fragment);
};

export { appendThumbnails };
