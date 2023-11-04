import {
  getRandomInteger,
  getRandomArrayElement,
  createSequentialIdGenerator,
  createRandomIdFromRangeGenerator,
  createJoinedLine
} from './util.js';

const PICTURE_COUNT = 25;
const PICTURE_ID_MIN = 1;
const FILE_NUMBER_MIN = 1;
const FILE_NUMBER_MAX = 25;
const LIKE_COUNT_MIN = 15;
const LIKE_COUNT_MAX = 200;
const COMMENT_COUNT_MIN = 0;
const COMMENT_COUNT_MAX = 30;
const COMMENT_ID_MIN = 0;
const COMMENT_ID_MAX = Number.MAX_SAFE_INTEGER;
const AVATAR_NUMBER_MIN = 1;
const AVATAR_NUMBER_MAX = 6;
const COMMENT_LINE_COUNT_MIN = 1;
const COMMENT_LINE_COUNT_MAX = 2;
const DESCRIPTIONS = [
  'Игра эмоций в красках',
  'Мир в одном кадре',
  'Линии и формы в гармонии',
  'Абстрактные перспективы',
  'Тайна в пространстве',
  'Границы и их размытие',
  'Словно мечта',
  'Шум визуального мира',
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
  'Себастьян Салгаду',
  'Александр Родченко',
  'Диана Арбус',
  'Ги Бурден',
  'Артур Феллиг',
  'Антон Корбейн',
  'Энни Лейбовиц'
];

const fileNumberMax = (FILE_NUMBER_MAX - FILE_NUMBER_MIN + 1 >= PICTURE_COUNT) ? FILE_NUMBER_MAX : (PICTURE_COUNT + FILE_NUMBER_MIN - 1);
const generateCommentId = createRandomIdFromRangeGenerator(COMMENT_ID_MIN, COMMENT_ID_MAX);
const generatePictureId = createSequentialIdGenerator(PICTURE_ID_MIN);
const generateFileNumber = createRandomIdFromRangeGenerator(FILE_NUMBER_MIN, fileNumberMax);

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(AVATAR_NUMBER_MIN, AVATAR_NUMBER_MAX)}.svg`,
  message: createJoinedLine(COMMENT_LINES, COMMENT_LINE_COUNT_MIN, COMMENT_LINE_COUNT_MAX),
  name: getRandomArrayElement(NAMES)
});

const createPicture = () => ({
  id: generatePictureId(),
  url: `photos/${generateFileNumber()}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(LIKE_COUNT_MIN, LIKE_COUNT_MAX),
  comments: Array.from({ length: getRandomInteger(COMMENT_COUNT_MIN, COMMENT_COUNT_MAX) }, createComment)
});

const createPictures = () => Array.from({ length: PICTURE_COUNT }, createPicture);

export { createPictures };
