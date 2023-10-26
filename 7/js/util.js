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

const createJoinedLine = (lines, lineCountMin, lineCountMax) => {
  const lineCount = getRandomInteger(lineCountMin, lineCountMax);

  if (lineCount >= lines.length) {
    return lines.join(' ');
  }

  const lineIndexGenerator = createRandomIdFromRangeGenerator(0, lines.length - 1);

  return Array.from({ length: lineCount }, () => lines[lineIndexGenerator()]).join(' ');
};

const getDataFromUrl = (url, objectArray, relativeUrlStart) => {
  const relativeUrl = url.slice(url.indexOf(relativeUrlStart));

  for (const item of objectArray) {
    if (item.url === relativeUrl) {
      return item;
    }
  }
};

const isEscapeKey = (evt) => evt.key === 'Escape';

export {
  getRandomInteger,
  getRandomArrayElement,
  createSequentialIdGenerator,
  createRandomIdFromRangeGenerator,
  createJoinedLine,
  getDataFromUrl,
  isEscapeKey
};
