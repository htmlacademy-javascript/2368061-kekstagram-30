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
