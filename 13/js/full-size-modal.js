import { isEscapeKey } from './util.js';
import { loadComments } from './comment.js';

const pictureContainerNode = document.querySelector('.pictures');
const modalNode = document.querySelector('.big-picture');
const modalPictureNode = modalNode.querySelector('.big-picture__img img');
const likeCountNode = modalNode.querySelector('.likes-count');
const totalCommentCountNode = modalNode.querySelector('.social__comment-total-count');
const commentListNode = modalNode.querySelector('.social__comments');
const captionNode = modalNode.querySelector('.social__caption');
const commentLoaderNode = modalNode.querySelector('.comments-loader');
const closeButtonNode = modalNode.querySelector('.big-picture__cancel');

const fillModalData = ({ url, likes, comments, description }) => {
  modalPictureNode.src = url;
  modalPictureNode.alt = description;
  likeCountNode.textContent = likes;
  captionNode.textContent = description;
  totalCommentCountNode.textContent = comments.length;

  commentLoaderNode.classList.remove('hidden');
  loadComments(comments);
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFullSizeModal();
  }
};

const openFullSizeModal = (pictureData) => {
  fillModalData(pictureData);

  modalNode.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
};

function closeFullSizeModal() {
  commentListNode.replaceChildren();

  modalNode.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
}

const setFullSizeModalHandlers = (pictures) => {
  let currentPictureData;

  pictureContainerNode.addEventListener('click', (evt) => {
    const thumbnailNode = evt.target.closest('a.picture');

    if (thumbnailNode) {
      evt.preventDefault();

      const thumbnailId = +thumbnailNode.dataset.thumbnailId;

      currentPictureData = pictures.find(({ id }) => id === thumbnailId);
      openFullSizeModal(currentPictureData);
    }
  });

  commentLoaderNode.addEventListener('click', () => {
    loadComments(currentPictureData.comments);
  });
};

closeButtonNode.addEventListener('click', () => {
  closeFullSizeModal();
});

export { setFullSizeModalHandlers };
