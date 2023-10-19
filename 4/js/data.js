import {getRandomInteger, getRandomArrayElement, createSequentialIdGenerator, createRandomIdFromRangeGenerator, getJoinedLine} from './util.js';

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
const IMAGE_COUNT = 25;
const IMAGE_ID_MIN = 1;
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

const fileNumberMax = (FILE_NUMBER_MAX - FILE_NUMBER_MIN + 1 >= IMAGE_COUNT) ? FILE_NUMBER_MAX : (IMAGE_COUNT + FILE_NUMBER_MIN - 1);

const commentIdGenerator = createRandomIdFromRangeGenerator(0, Number.MAX_SAFE_INTEGER);
const imageIdGenerator = createSequentialIdGenerator(IMAGE_ID_MIN);
const fileNumberGenerator = createRandomIdFromRangeGenerator(FILE_NUMBER_MIN, fileNumberMax);

const createComment = () => ({
  id: commentIdGenerator(),
  avatar: `img/avatar-${getRandomInteger(AVATAR_NUMBER_MIN, AVATAR_NUMBER_MAX)}.svg`,
  message: getJoinedLine(COMMENT_LINES, COMMENT_LINE_COUNT_MIN, COMMENT_LINE_COUNT_MAX),
  name: getRandomArrayElement(NAMES)
});

const createImage = () => ({
  id: imageIdGenerator(),
  url: `photos/${fileNumberGenerator()}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(LIKE_COUNT_MIN, LIKE_COUNT_MAX),
  comments: Array.from({ length: getRandomInteger(COMMENT_COUNT_MIN, COMMENT_COUNT_MAX) }, createComment)
});

const createImages = () => Array.from({ length: IMAGE_COUNT }, createImage);

export {createImages};
