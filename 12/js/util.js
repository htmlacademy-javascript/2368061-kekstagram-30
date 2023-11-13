const ALERT_SHOW_TIME = 5000;

const downloadErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
const uploadErrorTemplate = document.querySelector('#error').content.querySelector('.error');
const uploadSuccessTemplate = document.querySelector('#success').content.querySelector('.success');

let currentMessage;

const getRandomInteger = (start, end) => {
  const lower = Math.ceil(Math.min(start, end));
  const upper = Math.floor(Math.max(start, end));

  return Math.floor(Math.random() * (upper - lower + 1) + lower);
};

const createRandomIdFromRangeGenerator = (idMin, idMax) => {
  const previousValues = [];

  return () => {
    let currentValue = getRandomInteger(idMin, idMax);

    if (previousValues.length >= (idMax - idMin + 1)) {
      return null;
    }

    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(idMin, idMax);
    }

    previousValues.push(currentValue);

    return currentValue;
  };
};

const isEscapeKey = (evt) => evt.key === 'Escape';

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
    messageButton.addEventListener('click', () => {
      removeMessage();
    });
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

function debounce(callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export {
  createRandomIdFromRangeGenerator,
  isEscapeKey,
  showDownloadError,
  showUploadError,
  showUploadSuccess,
  debounce
};
