'use strict';

module.exports = (test, task) => {
  if (test) {
    return task;
  }

  return false;
};
