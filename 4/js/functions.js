const validateStringLength = (string, maxLength) => (maxLength >= string.length);

// Cтрока короче 20 символов
validateStringLength('проверяемая строка', 20); // true
// Длина строки ровно 18 символов
validateStringLength('проверяемая строка', 18); // true
// Строка длиннее 10 символов
validateStringLength('проверяемая строка', 10); // false


const isPalindrome = (string) => {
  const formattedString = string.replaceAll(' ', '').toLowerCase();

  for (let i = 0; i < formattedString.length / 2; i++) {
    if (formattedString.at(i) !== formattedString.at(-i - 1)) {
      return false;
    }
  }

  return true;
};

isPalindrome('топот'); // true
isPalindrome('ДовОд'); // true, несмотря на разный регистр
isPalindrome('Кекс'); // false
isPalindrome('Лёша на полке клопа нашёл '); // true


const extractNumber = (value) => {
  const string = value.toString();
  let result = '';

  for (let charIndex = 0; charIndex < string.length; charIndex++) {
    const currentChar = string[charIndex];

    if (currentChar >= '0' && currentChar <= '9') {
      result += currentChar;
    }
  }

  return parseInt(result, 10);
};

extractNumber('2023 год'); // 2023
extractNumber('ECMAScript 2022'); // 2022
extractNumber('1 кефир, 0.5 батона'); // 105
extractNumber('агент 007'); // 7
extractNumber('а я томат'); // NaN
extractNumber(2023); // 2023
extractNumber(-1); // 1
extractNumber(1.5); // 15

const parseTimeString = (timeString) => {
  const colonIndex = timeString.indexOf(':');
  const hourString = timeString.slice(0, colonIndex);
  const minuteString = timeString.slice(colonIndex + 1);
  return { hour: parseInt(hourString, 10), minute: parseInt(minuteString, 10) };
};

const calculateAdjustedTime = (currentTime, minutesOffset) => {
  const adjustedHour = currentTime.hour + Math.floor((currentTime.minute + minutesOffset) / 60);
  const adjustedMinute = (60 + currentTime.minute + minutesOffset) % 60;
  return { hour: adjustedHour, minute: adjustedMinute };
};

const isTimeLaterOrSame = (earlierTime, laterTime) => {
  if (laterTime.hour > earlierTime.hour) {
    return true;
  }
  if (laterTime.hour === earlierTime.hour && laterTime.minute >= earlierTime.minute) {
    return true;
  }
  return false;
};

const isMeetingInWorkday = (workdayStart, workdayEnd, meetingStart, duration) => {
  const workdayStartTime = parseTimeString(workdayStart);
  const workdayEndTime = parseTimeString(workdayEnd);
  const meetingStartTime = parseTimeString(meetingStart);
  const meetingEndTime = calculateAdjustedTime(meetingStartTime, duration);
  return (isTimeLaterOrSame(workdayStartTime, meetingStartTime) && isTimeLaterOrSame(meetingEndTime, workdayEndTime));
};

/* eslint-disable no-console */

console.assert(isMeetingInWorkday('08:00', '17:30', '14:00', 90)); // true
console.assert(isMeetingInWorkday('8:0', '10:0', '8:0', 120)); // true
console.assert(!isMeetingInWorkday('08:00', '14:30', '14:00', 90)); // false
console.assert(!isMeetingInWorkday('14:00', '17:30', '08:0', 90)); // false
console.assert(!isMeetingInWorkday('8:00', '17:30', '08:00', 900)); // false

/* eslint-enable no-console */
