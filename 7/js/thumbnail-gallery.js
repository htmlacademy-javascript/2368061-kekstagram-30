const pictureContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const addThumbnails = (pictures) => {

  const pictureFragment = document.createDocumentFragment();

  pictures.forEach(({ url, description, likes, comments }) => {
    const pictureNode = pictureTemplate.cloneNode(true);

    pictureNode.querySelector('.picture__img').src = url;
    pictureNode.querySelector('.picture__img').alt = description;
    pictureNode.querySelector('.picture__likes').textContent = likes;
    pictureNode.querySelector('.picture__comments').textContent = comments.length;

    pictureFragment.append(pictureNode);
  });

  pictureContainer.append(pictureFragment);
};

export { addThumbnails };
