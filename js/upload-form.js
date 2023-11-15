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

const form = document.querySelector('.img-upload__form');
const fileField = form.querySelector('.img-upload__input');
const overlay = form.querySelector('.img-upload__overlay');
const hashtagField = overlay.querySelector('.text__hashtags');
const descriptionField = overlay.querySelector('.text__description');
const mainPreview = overlay.querySelector('.img-upload__preview > img');
const effectPreviews = overlay.querySelectorAll('.effects__preview');
const submitButton = overlay.querySelector('.img-upload__submit');

const pristine = createPristine(form, hashtagField, descriptionField);

const isErrorMessageExists = () => Boolean(document.querySelector('.error'));

const isTextFieldFocused = () => [hashtagField, descriptionField].includes(document.activeElement);

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt) && !isTextFieldFocused() && !isErrorMessageExists()) {
    evt.preventDefault();
    form.reset();
  }
};

const isValidFileType = (file) => {
  const fileName = file.name.toLowerCase();

  return FILE_TYPES.some((fileType) => fileName.endsWith(fileType));
};

const updatePreviews = () => {
  const file = fileField.files[0];

  if (file && isValidFileType(file)) {
    mainPreview.src = URL.createObjectURL(file);

    effectPreviews.forEach((effectPreview) => {
      effectPreview.style.backgroundImage = `url('${mainPreview.src}')`;
    });
  }
};

const openUploadForm = () => {
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  resetEffect();
  updatePreviews();

  document.addEventListener('keydown', onDocumentKeydown);
};

const closeUploadForm = () => {
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');

  pristine.reset();
  mainPreview.style.transform = '';
  URL.revokeObjectURL(mainPreview.src);

  document.removeEventListener('keydown', onDocumentKeydown);
};

const toggleSubmitButton = (isDisabled) => {
  submitButton.disabled = isDisabled;
  submitButton.textContent = isDisabled ? SubmitButtonText.SENDING : SubmitButtonText.IDLE;
};

const setFileFieldChange = () => {
  fileField.addEventListener('change', () => {
    openUploadForm();
  });
};

setScaleHandlers();

form.addEventListener('submit', async (evt) => {
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

form.addEventListener('reset', () => {
  closeUploadForm();
});

export { setFileFieldChange };
