const validateStringLength = (string, maxLength) => (string.length <= maxLength);

// Cтрока короче 20 символов
validateStringLength('проверяемая строка', 20); // true
// Длина строки ровно 18 символов
validateStringLength('проверяемая строка', 18); // true
// Строка длиннее 10 символов
validateStringLength('проверяемая строка', 10); // false


const isPalindrome = (string) => {
  const formattedString = string.replaceAll(' ', '').toLowerCase();
  const centerIndex = Math.floor(formattedString.length / 2);

  for (let i = 0; i <= centerIndex; i++) {
    if (formattedString.at(i) !== formattedString.at(-i - 1)) {
      return false;
    }
  }

  return true;
};

// Строка является палиндромом
isPalindrome('топот'); // true
// Несмотря на разный регистр, тоже палиндром
isPalindrome('ДовОд'); // true
// Это не палиндром
isPalindrome('Кекс'); // false
// Это палиндром
isPalindrome('Лёша на полке клопа нашёл '); // true


const extractNumbers = (value) => {
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

extractNumbers('2023 год'); // 2023
extractNumbers('ECMAScript 2022'); // 2022
extractNumbers('1 кефир, 0.5 батона'); // 105
extractNumbers('агент 007'); // 7
extractNumbers('а я томат'); // NaN
extractNumbers(2023); // 2023
extractNumbers(-1); // 1
extractNumbers(1.5); // 15
