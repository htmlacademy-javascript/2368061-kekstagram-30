const COMMENTS_LOAD_STEP = 5;

const commentTemplateNode = document.querySelector('#comment').content.querySelector('.social__comment');
const modalNode = document.querySelector('.big-picture');
const commentListNode = modalNode.querySelector('.social__comments');
const commentLoaderNode = modalNode.querySelector('.comments-loader');
const shownCommentCountNode = modalNode.querySelector('.social__comment-shown-count');

const createComment = ({ avatar, message, name }) => {
  const newCommentNode = commentTemplateNode.cloneNode(true);

  newCommentNode.querySelector('.social__picture').src = avatar;
  newCommentNode.querySelector('.social__picture').alt = name;
  newCommentNode.querySelector('.social__text').textContent = message;

  return newCommentNode;
};

const createCommentFragment = (comments) => {
  const commentFragment = document.createDocumentFragment();
  const notRenderedCommentCount = comments.length - commentListNode.childElementCount;
  const newCommentsCount = Math.min(notRenderedCommentCount, COMMENTS_LOAD_STEP);

  for (let i = commentListNode.childElementCount; i < commentListNode.childElementCount + newCommentsCount; i++) {
    const comment = createComment(comments[i]);
    commentFragment.append(comment);
  }

  return commentFragment;
};

const loadComments = (comments) => {
  const commentFragment = createCommentFragment(comments);

  commentListNode.append(commentFragment);
  shownCommentCountNode.textContent = commentListNode.childElementCount;

  if (commentListNode.childElementCount === comments.length) {
    commentLoaderNode.classList.add('hidden');
  }
};

export { loadComments };
