const pictureContainerNode = document.querySelector('.pictures');
const thumbnailTemplateNode = document.querySelector('#picture').content.querySelector('.picture');

const createThumbnail = ({ id, url, description, likes, comments }) => {
  const thumbnailNode = thumbnailTemplateNode.cloneNode(true);

  thumbnailNode.querySelector('.picture__img').src = url;
  thumbnailNode.querySelector('.picture__img').alt = description;
  thumbnailNode.querySelector('.picture__likes').textContent = likes;
  thumbnailNode.querySelector('.picture__comments').textContent = comments.length;
  thumbnailNode.dataset.thumbnailId = id;

  return thumbnailNode;
};

const renderThumbnails = (pictures) => {
  const fragment = document.createDocumentFragment();

  pictures.forEach((picture) => {
    const thumbnailNode = createThumbnail(picture);
    fragment.append(thumbnailNode);
  });

  pictureContainerNode.append(fragment);
};

export { renderThumbnails };
