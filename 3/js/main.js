const DESCRIPTIONS = [
  'Игра эмоций в красках',
  'Звуки безмолвия',
  'Мир в одном кадре',
  'Линии и формы в гармонии',
  'Абстрактные перспективы',
  'Тайна в пространстве',
  'Сложность простоты',
  'Ритмы без мелодии',
  'Границы и их размытие',
  'Фрагменты вечности',
  'Словно мечта',
  'Интерпретация действительности',
  'Шум визуального мира',
  'Смешение измерений',
  'Гипнотические отражения'
];
const COMMENT_LINES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const NAMES = [
  'Хельмут Ньютон',
  'Анри Картье-Брессон',
  'Ричард Аведон',
  'Себастьян Салгаду',
  'Александр Родченко',
  'Уильям Юджин Смит',
  'Диана Арбус',
  'Ги Бурден',
  'Артур Феллиг',
  'Ирвин Пенн',
  'Антон Корбейн',
  'Стивен Майзел',
  'Энни Лейбовиц'
];
const PHOTO_COUNT = 25;
const PHOTO_ID_MIN = 1;
const FILE_NUMBER_MIN = 1;
const FILE_NUMBER_MAX = 25;
const COMMENT_COUNT_MIN = 0;
const COMMENT_COUNT_MAX = 30;
const AVATAR_NUMBER_MIN = 1;
const AVATAR_NUMBER_MAX = 6;
const LIKE_COUNT_MIN = 15;
const LIKE_COUNT_MAX = 200;
const COMMENT_LINE_COUNT_MIN = 1;
const COMMENT_LINE_COUNT_MAX = 2;

const fileNumberMax = (FILE_NUMBER_MAX - FILE_NUMBER_MIN + 1 >= PHOTO_COUNT) ? FILE_NUMBER_MAX : (PHOTO_COUNT + FILE_NUMBER_MIN - 1);

const getRandomInteger = (start, end) => {
  const lower = Math.ceil(Math.min(start, end));
  const upper = Math.floor(Math.max(start, end));

  return Math.floor(Math.random() * (upper - lower + 1) + lower);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createSequentialIdGenerator = (idMin = 0) => {
  let currentValue = idMin;

  return () => currentValue++;
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

const commentIdGenerator = createRandomIdFromRangeGenerator(0, Number.MAX_SAFE_INTEGER);
const photoIdGenerator = createSequentialIdGenerator(PHOTO_ID_MIN);
const fileNumberGenerator = createRandomIdFromRangeGenerator(FILE_NUMBER_MIN, fileNumberMax);

const createMessage = (lines, lineCountMin, lineCountMax) => {
  const lineCount = getRandomInteger(lineCountMin, lineCountMax);

  if (lineCount >= lines.length) {
    return lines.join(' ');
  }

  const lineIndexGenerator = createRandomIdFromRangeGenerator(0, lines.length - 1);

  return Array.from({ length: lineCount }, () => lines[lineIndexGenerator()]).join(' ');
};

const createComment = () => ({
  id: commentIdGenerator(),
  avatar: `img/avatar-${getRandomInteger(AVATAR_NUMBER_MIN, AVATAR_NUMBER_MAX)}.svg`,
  message: createMessage(COMMENT_LINES, COMMENT_LINE_COUNT_MIN, COMMENT_LINE_COUNT_MAX),
  name: getRandomArrayElement(NAMES)
});

const createPhotoDescription = () => ({
  id: photoIdGenerator(),
  url: `photos/${fileNumberGenerator()}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(LIKE_COUNT_MIN, LIKE_COUNT_MAX),
  comments: Array.from({ length: getRandomInteger(COMMENT_COUNT_MIN, COMMENT_COUNT_MAX) }, createComment)
});

const photoDescriptions = Array.from({ length: PHOTO_COUNT }, createPhotoDescription);

// eslint-disable-next-line no-console
console.table(photoDescriptions);
