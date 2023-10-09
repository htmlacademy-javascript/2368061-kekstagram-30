const checkLength = (string, maxLength) => (string.length <= maxLength);

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
