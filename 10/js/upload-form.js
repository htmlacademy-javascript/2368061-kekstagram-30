import { isEscapeKey } from './util.js';
import { createPristine } from './validation.js';
import { resetEffect } from './effect.js';

const SCALE_MIN = 25;
const SCALE_MAX = 100;
const SCALE_STEP = 25;

const form = document.querySelector('.img-upload__form');
const fileField = form.querySelector('.img-upload__input');
const overlay = form.querySelector('.img-upload__overlay');
const hashtagField = overlay.querySelector('.text__hashtags');
const descriptionField = overlay.querySelector('.text__description');
const scaleValue = overlay.querySelector('.scale__control--value');
const scaleDownControl = overlay.querySelector('.scale__control--smaller');
const scaleUpControl = overlay.querySelector('.scale__control--bigger');
const previewImage = overlay.querySelector('.img-upload__preview > img');

const pristine = createPristine(form, hashtagField, descriptionField);

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();

    if (![hashtagField, descriptionField].includes(document.activeElement)) {
      form.reset();
    }
  }
};

const openUploadForm = () => {
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  resetEffect();

  document.addEventListener('keydown', onDocumentKeydown);
};

const closeUploadForm = () => {
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');

  pristine.reset();
  previewImage.style.transform = '';

  document.removeEventListener('keydown', onDocumentKeydown);
};

const setScale = (value) => {
  if (value < SCALE_MIN) {
    value = SCALE_MIN;
  } else if (value > SCALE_MAX) {
    value = SCALE_MAX;
  }

  scaleValue.value = `${value}%`;
  previewImage.style.transform = `scale(${value / 100})`;
};

const addImageUploadHandler = () => {
  fileField.addEventListener('change', () => {
    openUploadForm();
  });
};

form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  if (pristine.validate()) {
    form.submit();
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

export { addImageUploadHandler };
