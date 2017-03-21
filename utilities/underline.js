'use strict';

const getChars = (len, char) => new Array(len)
  .join(char);

module.exports = (obj, offset) => {
  const keys = Object.keys(obj);

  let longestName = 0;
  let longestVal = 0;

  keys.map((key) => {
    if (key.length > longestName) {
      longestName = key.length;
    }

    if (obj[key].length > longestVal) {
      longestVal = obj[key].length;
    }

    return key;
  });

  return getChars(longestName + longestVal + offset, '-');
};
