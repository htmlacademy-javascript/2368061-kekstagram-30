import { isEscapeKey } from './util.js';

const COMMENTS_LOAD_STEP = 5;

const pictureContainer = document.querySelector('.pictures');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
const modal = document.querySelector('.big-picture');
const picture = modal.querySelector('.big-picture__img img');
const likeCount = modal.querySelector('.likes-count');
const commentCount = modal.querySelector('.social__comment-count');
const shownCommentCount = commentCount.querySelector('.social__comment-shown-count');
const totalCommentCount = commentCount.querySelector('.social__comment-total-count');
const commentList = modal.querySelector('.social__comments');
const description = modal.querySelector('.social__caption');
const commentLoader = modal.querySelector('.comments-loader');
const modalCloseButton = modal.querySelector('.big-picture__cancel');

let currentPictureData;

const createComment = ({ avatar, message, name }) => {
  const comment = commentTemplate.cloneNode(true);

  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};

const createCommentFragment = (comments) => {
  const fragment = document.createDocumentFragment();
  const fragmentCommentCount = Math.min(comments.length - commentList.childElementCount, COMMENTS_LOAD_STEP);

  for (let i = commentList.childElementCount; i < commentList.childElementCount + fragmentCommentCount; i++) {
    const comment = createComment(comments[i]);
    fragment.append(comment);
  }

  if (fragmentCommentCount === comments.length - commentList.childElementCount) {
    commentLoader.classList.add('hidden');
  }

  return fragment;
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();

    closeFullSizeModal();
  }
};

function openFullSizeModal(pictureData) {
  picture.src = pictureData.url;
  likeCount.textContent = pictureData.likes;
  totalCommentCount.textContent = pictureData.comments.length;
  description.textContent = pictureData.description;
  commentList.replaceChildren(createCommentFragment(pictureData.comments));
  shownCommentCount.textContent = commentList.childElementCount;

  modal.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
}

function closeFullSizeModal() {
  commentList.replaceChildren();

  commentLoader.classList.remove('hidden');
  modal.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
}

const addThumbnailClickHandler = (pictures) => {
  pictureContainer.addEventListener('click', (evt) => {
    const thumbnail = evt.target.closest('a.picture');

    if (thumbnail) {
      evt.preventDefault();

      currentPictureData = pictures[thumbnail.dataset.index];
      openFullSizeModal(currentPictureData);
    }
  });
};

commentLoader.addEventListener('click', () => {
  const loadedComments = createCommentFragment(currentPictureData.comments);

  commentList.append(loadedComments);
  shownCommentCount.textContent = commentList.childElementCount;
});

modalCloseButton.addEventListener('click', () => {
  closeFullSizeModal();
});

export { addThumbnailClickHandler };
