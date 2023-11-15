import { isEscapeKey } from './util.js';
import { showUploadSuccess, showUploadError } from './message.js';
import { setScaleHandlers } from './scale.js';
import { createPristine } from './validation.js';
import { resetEffect } from './effect.js';
import { sendData } from './api.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};

const formNode = document.querySelector('.img-upload__form');
const fileFieldNode = formNode.querySelector('.img-upload__input');
const overlayNode = formNode.querySelector('.img-upload__overlay');
const hashtagFieldNode = overlayNode.querySelector('.text__hashtags');
const descriptionFieldNode = overlayNode.querySelector('.text__description');
const mainPreviewNode = overlayNode.querySelector('.img-upload__preview > img');
const effectPreviewNodes = overlayNode.querySelectorAll('.effects__preview');
const submitButtonNode = overlayNode.querySelector('.img-upload__submit');

const pristine = createPristine(formNode, hashtagFieldNode, descriptionFieldNode);

const isErrorMessageExists = () => Boolean(document.querySelector('.error'));

const isTextFieldFocused = () => [hashtagFieldNode, descriptionFieldNode].includes(document.activeElement);

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt) && !isTextFieldFocused() && !isErrorMessageExists()) {
    evt.preventDefault();
    formNode.reset();
  }
};

const isValidFileType = (file) => {
  const fileName = file.name.toLowerCase();

  return FILE_TYPES.some((fileType) => fileName.endsWith(fileType));
};

const updatePreviews = () => {
  const file = fileFieldNode.files[0];

  if (isValidFileType(file)) {
    mainPreviewNode.src = URL.createObjectURL(file);

    effectPreviewNodes.forEach((previewNode) => {
      previewNode.style.backgroundImage = `url('${mainPreviewNode.src}')`;
    });
  }
};

const openUploadForm = () => {
  overlayNode.classList.remove('hidden');
  document.body.classList.add('modal-open');

  resetEffect();
  updatePreviews();

  document.addEventListener('keydown', onDocumentKeydown);
};

const closeUploadForm = () => {
  overlayNode.classList.add('hidden');
  document.body.classList.remove('modal-open');

  pristine.reset();
  mainPreviewNode.style.transform = '';
  URL.revokeObjectURL(mainPreviewNode.src);

  document.removeEventListener('keydown', onDocumentKeydown);
};

const toggleSubmitButton = (isDisabled) => {
  submitButtonNode.disabled = isDisabled;
  submitButtonNode.textContent = isDisabled ? SubmitButtonText.SENDING : SubmitButtonText.IDLE;
};

const setFileFieldChange = () => {
  fileFieldNode.addEventListener('change', () => {
    openUploadForm();
  });
};

setScaleHandlers();

formNode.addEventListener('submit', async (evt) => {
  evt.preventDefault();

  if (pristine.validate()) {
    toggleSubmitButton(true);

    try {
      await sendData(new FormData(evt.target));
      evt.target.reset();
      showUploadSuccess();
    } catch {
      showUploadError();
    }

    toggleSubmitButton(false);
  }
});

formNode.addEventListener('reset', () => {
  closeUploadForm();
});

export { setFileFieldChange };
