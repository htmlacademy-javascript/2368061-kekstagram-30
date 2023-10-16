const DESCRIPTIONS = [
  'Игра эмоций в красках',
  'Звуки безмолвия',
  'Мир в одном кадре',
  'Линии и формы в гармонии',
  'Абстрактные перспективы',
  'Тайна в пространстве',
  'Игра света во мраке',
  'Ритмы без мелодии',
  'Границы и их размытие',
  'Фрагменты вечности',
  'Словно мечта',
  'Интерпретация действительности',
  'Шум визуального мира',
  'Смешение измерений',
  'Гипнотические отражения',
  'Ассоциации без слов',
  'Сложность простоты',
  'Искусство абстракции',
  'Геометрический портрет',
  'Инновации в деталях',
  'Магия вещей незаметных',
  'Игра теней и света',
  'Сокрытое в геометрии',
  'Спрятанные миры',
  'Искусство видеть невидимое'
];
const MESSAGES = [
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
  'Уильям Юджин Смит',
  'Ги Бурден',
  'Артур Феллиг',
  'Александр Родченко',
  'Ирвин Пенн',
  'Антон Корбейн',
  'Стивен Майзел',
  'Диана Арбус',
  'Энни Лейбовиц'
];
const PHOTO_COUNT = 25;
const PHOTO_ID_RANGE_START = 1;
const PHOTO_ID_RANGE_END = 25;
const URL_RANGE_START = 1;
const URL_RANGE_END = 25;
const LIKES_MIN_NUMBER = 15;
const LIKES_MAX_NUMBER = 200;
const COMMENTS_MIN_NUMBER = 0;
const COMMENTS_MAX_NUMBER = 30;
const AVATARS_MIN_ID = 1;
const AVATARS_MAX_ID = 6;
const MIN_RANDOM_MESSAGES = 1;
const MAX_RANDOM_MESSAGES = 2;

const getRandomInteger = (start, end) => {
  const lower = Math.ceil(Math.min(start, end));
  const upper = Math.floor(Math.max(start, end));

  return Math.floor(Math.random() * (upper - lower + 1) + lower);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createRandomIdFromRangeGenerator = (minId, maxId) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(minId, maxId);

    if (previousValues.length >= (maxId - minId + 1)) {
      return null;
    }

    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(minId, maxId);
    }

    previousValues.push(currentValue);

    return currentValue;
  };
};

const photoIdGenerator = createRandomIdFromRangeGenerator(PHOTO_ID_RANGE_START, PHOTO_ID_RANGE_END);
const urlGenerator = createRandomIdFromRangeGenerator(URL_RANGE_START, URL_RANGE_END);
const commentIdGenerator = createRandomIdFromRangeGenerator(0, Number.MAX_SAFE_INTEGER);

const getRandomMessage = (messages, minRandomMessages, maxRandomMessages) => {
  const joinedMessagesNumber = getRandomInteger(minRandomMessages, maxRandomMessages);

  if (joinedMessagesNumber >= messages.length) {
    return messages.join(' ');
  }

  const messageIndexGenerator = createRandomIdFromRangeGenerator(0, messages.length - 1);
  let result = '';

  for (let i = 0; i < joinedMessagesNumber; i++) {
    const currentIndex = messageIndexGenerator();
    result += ` ${messages[currentIndex]}`;
  }

  return result.trimStart();
};

const createComment = () => ({
  id: commentIdGenerator(),
  avatar: `img/avatar-${getRandomInteger(AVATARS_MIN_ID, AVATARS_MAX_ID)}.svg`,
  message: getRandomMessage(MESSAGES, MIN_RANDOM_MESSAGES, MAX_RANDOM_MESSAGES),
  name: getRandomArrayElement(NAMES)
});

const createPhotoDescription = () => ({
  id: photoIdGenerator(),
  url: `photos/${urlGenerator()}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(LIKES_MIN_NUMBER, LIKES_MAX_NUMBER),
  comments: Array.from({ length: getRandomInteger(COMMENTS_MIN_NUMBER, COMMENTS_MAX_NUMBER) }, createComment)
});

const photoDescriptions = Array.from({ length: PHOTO_COUNT }, createPhotoDescription);

console.log(photoDescriptions);
