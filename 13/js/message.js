import { isEscapeKey } from './util.js';

const ALERT_SHOW_TIME = 5000;

const downloadErrorTemplateNode = document.querySelector('#data-error').content.querySelector('.data-error');
const uploadErrorTemplateNode = document.querySelector('#error').content.querySelector('.error');
const uploadSuccessTemplateNode = document.querySelector('#success').content.querySelector('.success');

let currentMessageNode;

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    removeMessage();
  }
};

const onBodyClick = (evt) => {
  if (!currentMessageNode.children[0].contains(evt.target)) {
    removeMessage();
  }
};

function removeMessage() {
  currentMessageNode.remove();

  document.removeEventListener('keydown', onDocumentKeydown);
  document.body.removeEventListener('click', onBodyClick);
}

const addMessageButtonHandler = (buttonClass) => {
  const closeButtonNode = currentMessageNode.querySelector(buttonClass);

  if (closeButtonNode) {
    closeButtonNode.addEventListener('click', () => {
      removeMessage();
    });
  }
};

const showMessage = (templateNode) => {
  currentMessageNode = templateNode.cloneNode(true);

  document.body.append(currentMessageNode);
};

const showMessageWithButton = (messageTemplateNode, buttonClass) => {
  showMessage(messageTemplateNode);
  addMessageButtonHandler(buttonClass);

  document.addEventListener('keydown', onDocumentKeydown);
  document.body.addEventListener('click', onBodyClick);
};

const showDownloadError = () => {
  showMessage(downloadErrorTemplateNode);

  setTimeout(() => {
    currentMessageNode.remove();
  }, ALERT_SHOW_TIME);
};

const showUploadError = () => showMessageWithButton(uploadErrorTemplateNode, '.error__button');
const showUploadSuccess = () => showMessageWithButton(uploadSuccessTemplateNode, '.success__button');

export {
  showDownloadError,
  showUploadError,
  showUploadSuccess
};
