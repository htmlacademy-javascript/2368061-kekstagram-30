
const HASHTAG_COUNT_MAX = 5;
const DESCRIPTION_LENGTH_MAX = 140;
const HASHTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;

const form = document.querySelector('.img-upload__form');
const hashtags = form.querySelector('.text__hashtags');
const description = form.querySelector('.text__description');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'p'
});

let duplicateHashtags = [];
let invalidHashtags = [];

const validateHashtagCount = (value) => value.trim().replace(/\s+/g, ' ').split(' ').length <= HASHTAG_COUNT_MAX;

const getHashtagCountError = () => `Количество хэш-тегов превышает ${HASHTAG_COUNT_MAX}`;

const validateHashtagUniqueness = (value) => {
  const hashtagArray = value.trim().replace(/\s+/g, ' ').toLowerCase().split(' ');
  const uniqueHashtags = {};
  duplicateHashtags = [];

  hashtagArray.forEach((hashtag) => {
    if (uniqueHashtags[hashtag]) {
      if (!duplicateHashtags.includes(hashtag)) {
        duplicateHashtags.push(hashtag);
      }
    } else {
      uniqueHashtags[hashtag] = true;
    }
  });

  return !duplicateHashtags.length;
};

const getHashtagUniquenessError = () => {
  const errorLabel = (duplicateHashtags.length === 1) ? 'Хэш-тег повторяется: ' : 'Хэш-теги повторяются: ';

  return errorLabel + duplicateHashtags.join(', ');
};

const validateHashtagSyntax = (value) => {
  if (value.trim() === '') {
    return true;
  }

  const hashtagArray = value.trim().replace(/\s+/g, ' ').split(' ');
  invalidHashtags = [];

  hashtagArray.forEach((hashtag) => {
    if (!HASHTAG_REGEX.test(hashtag)) {
      invalidHashtags.push(hashtag);
    }
  });

  return !invalidHashtags.length;
};

const getHashtagSyntaxError = () => {
  const errorLabel = (invalidHashtags.length === 1) ? 'Невалидный хэш-тег: ' : 'Невалидные хэш-теги: ';

  return errorLabel + invalidHashtags.join(' ');
};

const validateDescriptionLength = (value) => value.length <= DESCRIPTION_LENGTH_MAX;

const getDescriptionLengthError = () => `Длина комментария больше ${DESCRIPTION_LENGTH_MAX} символов`;

pristine.addValidator(hashtags, validateHashtagCount, getHashtagCountError);
pristine.addValidator(hashtags, validateHashtagUniqueness, getHashtagUniquenessError);
pristine.addValidator(hashtags, validateHashtagSyntax, getHashtagSyntaxError);
pristine.addValidator(description, validateDescriptionLength, getDescriptionLengthError);

export { pristine };
