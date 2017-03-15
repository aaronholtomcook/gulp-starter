'use strict';

module.exports = (test, task, otherwise = null) => {
  if (test) {
    return task;
  } else {
    if (otherwise) {
      return otherwise;
    }

    return false;
  }
};
