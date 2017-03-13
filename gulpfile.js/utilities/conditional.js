'use strict';

module.exports = (prop, val, task) => {
  if (prop === val) {
    return task;
  }

  return false;
};
