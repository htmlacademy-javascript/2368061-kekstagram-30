const COMMENTS_LOAD_STEP = 5;

const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
const modal = document.querySelector('.big-picture');
const commentList = modal.querySelector('.social__comments');
const commentLoader = modal.querySelector('.comments-loader');
const shownCommentCount = modal.querySelector('.social__comment-shown-count');

const createComment = ({ avatar, message, name }) => {
  const newComment = commentTemplate.cloneNode(true);

  newComment.querySelector('.social__picture').src = avatar;
  newComment.querySelector('.social__picture').alt = name;
  newComment.querySelector('.social__text').textContent = message;

  return newComment;
};

const createCommentFragment = (comments) => {
  const commentFragment = document.createDocumentFragment();
  const notRenderedCommentCount = comments.length - commentList.childElementCount;
  const newCommentsCount = Math.min(notRenderedCommentCount, COMMENTS_LOAD_STEP);

  for (let i = commentList.childElementCount; i < commentList.childElementCount + newCommentsCount; i++) {
    const comment = createComment(comments[i]);
    commentFragment.append(comment);
  }

  return commentFragment;
};

const loadComments = (comments) => {
  const commentFragment = createCommentFragment(comments);

  commentList.append(commentFragment);
  shownCommentCount.textContent = commentList.childElementCount;

  if (commentList.childElementCount === comments.length) {
    commentLoader.classList.add('hidden');
  }
};

export { loadComments };
