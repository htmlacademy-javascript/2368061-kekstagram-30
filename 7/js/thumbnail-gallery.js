const pictureContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const addThumbnails = (pictures) => {
  const pictureFragment = document.createDocumentFragment();

  for (let i = 0; i < pictures.length; i++) {
    const { url, description, likes, comments } = pictures[i];
    const pictureNode = pictureTemplate.cloneNode(true);

    pictureNode.querySelector('.picture__img').src = url;
    pictureNode.querySelector('.picture__img').alt = description;
    pictureNode.querySelector('.picture__likes').textContent = likes;
    pictureNode.querySelector('.picture__comments').textContent = comments.length;
    pictureNode.setAttribute('data-index', i);

    pictureFragment.append(pictureNode);
  }

  pictureContainer.append(pictureFragment);
};

export { addThumbnails };
