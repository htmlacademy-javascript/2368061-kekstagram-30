import { isEscapeKey } from './util.js';
import { loadComments } from './comment.js';

const pictureContainer = document.querySelector('.pictures');
const modal = document.querySelector('.big-picture');
const picture = modal.querySelector('.big-picture__img img');
const likeCount = modal.querySelector('.likes-count');
const totalCommentCount = modal.querySelector('.social__comment-total-count');
const commentList = modal.querySelector('.social__comments');
const caption = modal.querySelector('.social__caption');
const commentLoader = modal.querySelector('.comments-loader');
const closeButton = modal.querySelector('.big-picture__cancel');

const fillModalData = ({ url, likes, comments, description }) => {
  picture.src = url;
  picture.alt = description;
  likeCount.textContent = likes;
  caption.textContent = description;
  totalCommentCount.textContent = comments.length;

  commentLoader.classList.remove('hidden');
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

  modal.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
};

function closeFullSizeModal() {
  commentList.replaceChildren();

  modal.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
}

const addFullSizeModalHandlers = (pictures) => {
  let currentPictureData;

  pictureContainer.addEventListener('click', (evt) => {
    const thumbnail = evt.target.closest('a.picture');

    if (thumbnail) {
      evt.preventDefault();
      currentPictureData = pictures[thumbnail.dataset.arrayIndex];
      openFullSizeModal(currentPictureData);
    }
  });

  commentLoader.addEventListener('click', () => {
    loadComments(currentPictureData.comments);
  });
};

closeButton.addEventListener('click', () => {
  closeFullSizeModal();
});

export { addFullSizeModalHandlers };
