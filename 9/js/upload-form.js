import { isEscapeKey } from './util.js';
import {
  validateHashtagCount,
  getHashtagCountError,
  validateHashtagUniqueness,
  getHashtagUniquenessError,
  validateHashtagSyntax,
  getHashtagSyntaxError,
  validateDescriptionLength,
  getDescriptionLengthError
} from './validation.js';

const form = document.querySelector('.img-upload__form');
const uploadInput = form.querySelector('.img-upload__input');
const overlay = form.querySelector('.img-upload__overlay');
const hashtags = overlay.querySelector('.text__hashtags');
const description = overlay.querySelector('.text__description');

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

  document.addEventListener('keydown', onDocumentKeydown);
};

const closeUploadForm = () => {
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
};

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'p'
});

pristine.addValidator(hashtags, validateHashtagCount, getHashtagCountError);
pristine.addValidator(hashtags, validateHashtagUniqueness, getHashtagUniquenessError);
pristine.addValidator(hashtags, validateHashtagSyntax, getHashtagSyntaxError);
pristine.addValidator(description, validateDescriptionLength, getDescriptionLengthError);

const addUploadInputChangeHandler = () => {
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
  pristine.reset();
});

export { addUploadInputChangeHandler };
