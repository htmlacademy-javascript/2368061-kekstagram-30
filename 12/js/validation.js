
const HASHTAG_COUNT_MAX = 5;
const DESCRIPTION_LENGTH_MAX = 140;
const HASHTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;

let duplicateTags, invalidTags;

const normalizeTags = (tagString) => tagString.trim().toLowerCase().split(' ').filter(Boolean);

const validateHashtagCount = (value) => normalizeTags(value).length <= HASHTAG_COUNT_MAX;

const getHashtagCountError = () => `Количество хэш-тегов превышает ${HASHTAG_COUNT_MAX}`;

const validateHashtagUniqueness = (value) => {
  const uniqueTags = new Set();
  duplicateTags = new Set();

  normalizeTags(value).forEach((tag) => {
    if (uniqueTags.has(tag)) {
      duplicateTags.add(tag);
    } else {
      uniqueTags.add(tag);
    }
  });

  return !duplicateTags.size;
};

const getHashtagUniquenessError = () => {
  const errorLabel = (duplicateTags.size === 1) ? 'Хэш-тег повторяется:' : 'Хэш-теги повторяются:';

  return `${errorLabel} ${[...duplicateTags].join(' ')}`;
};

const validateHashtagSyntax = (value) => {
  const invalidTagsArray = normalizeTags(value).filter((tag) => !HASHTAG_REGEX.test(tag));

  invalidTags = new Set(invalidTagsArray);

  return !invalidTags.size;
};

const getHashtagSyntaxError = () => {
  const errorLabel = (invalidTags.size === 1) ? 'Неправильный хэш-тег:' : 'Неправильные хэш-теги:';

  return `${errorLabel} ${[...invalidTags].join(' ')}`;
};

const validateDescriptionLength = (value) => value.length <= DESCRIPTION_LENGTH_MAX;

const getDescriptionLengthError = () => `Длина комментария больше ${DESCRIPTION_LENGTH_MAX} символов`;

const createPristine = (form, hashtagField, descriptionField) => {
  const pristine = new Pristine(form, {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'p',
    errorTextClass: 'img-upload__field-wrapper--error'
  });

  pristine.addValidator(hashtagField, validateHashtagCount, getHashtagCountError);
  pristine.addValidator(hashtagField, validateHashtagUniqueness, getHashtagUniquenessError);
  pristine.addValidator(hashtagField, validateHashtagSyntax, getHashtagSyntaxError);
  pristine.addValidator(descriptionField, validateDescriptionLength, getDescriptionLengthError);

  return pristine;
};

export { createPristine };
