const getRandomInteger = (start, end) => {
  const lower = Math.ceil(Math.min(start, end));
  const upper = Math.floor(Math.max(start, end));

  return Math.floor(Math.random() * (upper - lower + 1) + lower);
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

const isEscapeKey = (evt) => evt.key === 'Escape';

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {
  createRandomIdFromRangeGenerator,
  isEscapeKey,
  debounce
};
