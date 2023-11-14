import { isEscapeKey, showUploadSuccess, showUploadError } from './util.js';
import { createPristine } from './validation.js';
import { resetEffect } from './effect.js';
import { sendData } from './api.js';

const SCALE_MIN = 25;
const SCALE_MAX = 100;
const SCALE_STEP = 25;
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
const scaleValue = overlay.querySelector('.scale__control--value');
const scaleDownControl = overlay.querySelector('.scale__control--smaller');
const scaleUpControl = overlay.querySelector('.scale__control--bigger');
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

const onMainPreviewLoad = () => {
  URL.revokeObjectURL(mainPreview.src);
};

const updatePreviews = () => {
  const file = fileField.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((fileType) => fileName.endsWith(fileType));

  if (matches) {
    const pictureUrlString = URL.createObjectURL(file);

    mainPreview.src = pictureUrlString;

    effectPreviews.forEach((effectPreview) => {
      effectPreview.style.backgroundImage = `url('${pictureUrlString}')`;
    });

    mainPreview.addEventListener('load', onMainPreviewLoad);
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

  document.removeEventListener('keydown', onDocumentKeydown);
  mainPreview.removeEventListener('load', onMainPreviewLoad);
};

const setScale = (value) => {
  if (value < SCALE_MIN) {
    value = SCALE_MIN;
  } else if (value > SCALE_MAX) {
    value = SCALE_MAX;
  }

  scaleValue.value = `${value}%`;
  mainPreview.style.transform = `scale(${value / 100})`;
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

scaleDownControl.addEventListener('click', () => {
  const scaleAfterClick = parseInt(scaleValue.value, 10) - SCALE_STEP;

  setScale(scaleAfterClick);
});

scaleUpControl.addEventListener('click', () => {
  const scaleAfterClick = parseInt(scaleValue.value, 10) + SCALE_STEP;

  setScale(scaleAfterClick);
});

export { setFileFieldChange };
