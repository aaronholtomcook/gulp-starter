'use strict';

function getChars (len, char) {
  return new Array(len).join(char);
}

module.exports = (obj) => {
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
  });

  return getChars(longestName + longestVal, '-');
};
