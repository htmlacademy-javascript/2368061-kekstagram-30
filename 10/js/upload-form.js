import { isEscapeKey } from './util.js';
import { pristine } from './validation.js';
import { cancelEffects } from './effects.js';

const SCALE_MIN = 25;
const SCALE_MAX = 100;
const SCALE_STEP = 25;

const form = document.querySelector('.img-upload__form');
const uploadInput = form.querySelector('.img-upload__input');
const overlay = form.querySelector('.img-upload__overlay');
const hashtags = overlay.querySelector('.text__hashtags');
const description = overlay.querySelector('.text__description');
const scaleValue = overlay.querySelector('.scale__control--value');
const scaleDownControl = overlay.querySelector('.scale__control--smaller');
const scaleUpControl = overlay.querySelector('.scale__control--bigger');
const previewImage = overlay.querySelector('.img-upload__preview > img');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();

    if (![hashtags, description].includes(document.activeElement)) {
      form.reset();
    }
  }
};

const openUploadForm = () => {
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  cancelEffects();

  document.addEventListener('keydown', onDocumentKeydown);
};

const closeUploadForm = () => {
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');

  pristine.reset();
  previewImage.style.transform = '';

  document.removeEventListener('keydown', onDocumentKeydown);
};

const changeScale = (value) => {
  if (value < SCALE_MIN) {
    value = SCALE_MIN;
  } else if (value > SCALE_MAX) {
    value = SCALE_MAX;
  }

  scaleValue.value = `${value}%`;
  previewImage.style.transform = `scale(${value / 100})`;
};

const addImageUploadHandler = () => {
  uploadInput.addEventListener('change', () => {
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

  changeScale(scaleAfterClick);
});

scaleUpControl.addEventListener('click', () => {
  const scaleAfterClick = parseInt(scaleValue.value, 10) + SCALE_STEP;

  changeScale(scaleAfterClick);
});

export { addImageUploadHandler };
