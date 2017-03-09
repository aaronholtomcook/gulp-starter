'use strict';

module.exports = (task) => {
  if (process.env.NODE_ENV === 'production') {
    return task;
  }

  return false;
};
