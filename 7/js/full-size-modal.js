import { isEscapeKey } from './util.js';

const COMMENTS_LOAD_STEP = 5;

const pictureContainer = document.querySelector('.pictures');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
const modal = document.querySelector('.big-picture');
const picture = modal.querySelector('.big-picture__img img');
const likeCount = modal.querySelector('.likes-count');
const commentCountNode = modal.querySelector('.social__comment-count');
const shownCommentCount = commentCountNode.querySelector('.social__comment-shown-count');
const totalCommentCount = commentCountNode.querySelector('.social__comment-total-count');
const commentList = modal.querySelector('.social__comments');
const description = modal.querySelector('.social__caption');
const commentLoader = modal.querySelector('.comments-loader');
const modalCloseButton = modal.querySelector('.big-picture__cancel');

let currentPictureData;

const createCommentNodes = (comments) => {
  const commentFragment = document.createDocumentFragment();
  const createdCommentsCount = Math.min(commentList.childElementCount + COMMENTS_LOAD_STEP, comments.length);

  for (let i = commentList.childElementCount; i < createdCommentsCount; i++) {
    const { avatar, message, name } = comments[i];
    const commentNode = commentTemplate.cloneNode(true);

    commentNode.querySelector('.social__picture').src = avatar;
    commentNode.querySelector('.social__picture').alt = name;
    commentNode.querySelector('.social__text').textContent = message;

    commentFragment.append(commentNode);
  }

  if (createdCommentsCount === comments.length) {
    commentLoader.classList.add('hidden');
  }

  return commentFragment;
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();

    closeFullSizeModal();
  }
};

function openFullSizeModal(dataObject) {
  picture.src = dataObject.url;
  likeCount.textContent = dataObject.likes;
  totalCommentCount.textContent = dataObject.comments.length;
  description.textContent = dataObject.description;
  commentList.replaceChildren(createCommentNodes(dataObject.comments));
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
    const thumbnailNode = evt.target.closest('a.picture');

    if (thumbnailNode) {
      evt.preventDefault();

      currentPictureData = pictures[thumbnailNode.dataset.index];
      openFullSizeModal(currentPictureData);
    }
  });
};

commentLoader.addEventListener('click', () => {
  const commentNodes = createCommentNodes(currentPictureData.comments);

  commentList.append(commentNodes);
  shownCommentCount.textContent = commentList.childElementCount;
});

modalCloseButton.addEventListener('click', () => {
  closeFullSizeModal();
});

export { addThumbnailClickHandler };
