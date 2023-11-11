const ALERT_SHOW_TIME = 5000;

const downloadErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
const uploadErrorTemplate = document.querySelector('#error').content.querySelector('.error');
const uploadSuccessTemplate = document.querySelector('#success').content.querySelector('.success');

let currentMessage;

const isEscapeKey = (evt) => evt.key === 'Escape';

const onMessageButtonClick = () => {
  removeMessage();
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    removeMessage();
  }
};

const onBodyClick = (evt) => {
  if (!currentMessage.children[0].contains(evt.target)) {
    removeMessage();
  }
};

function removeMessage() {
  currentMessage.remove();

  document.removeEventListener('keydown', onDocumentKeydown);
  document.body.removeEventListener('click', onBodyClick);
}

const addMessageButtonHandler = (buttonClass) => {
  const messageButton = currentMessage.querySelector(buttonClass);

  if (messageButton) {
    messageButton.addEventListener('click', onMessageButtonClick);
  }
};

const showMessage = (template) => {
  currentMessage = template.cloneNode(true);

  document.body.append(currentMessage);
};

const showMessageWithButton = (messageTemplate, buttonClass) => {
  showMessage(messageTemplate);
  addMessageButtonHandler(buttonClass);

  document.addEventListener('keydown', onDocumentKeydown);
  document.body.addEventListener('click', onBodyClick);
};

const showDownloadError = () => {
  showMessage(downloadErrorTemplate);

  setTimeout(() => {
    currentMessage.remove();
  }, ALERT_SHOW_TIME);
};

const showUploadError = () => showMessageWithButton(uploadErrorTemplate, '.error__button');
const showUploadSuccess = () => showMessageWithButton(uploadSuccessTemplate, '.success__button');

export {
  isEscapeKey,
  showDownloadError,
  showUploadError,
  showUploadSuccess
};
