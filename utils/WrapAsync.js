// utils/WrapAsync.js
module.exports = function wrapAsync(fn) {
    return function(req, res, next) {
      // Add validation to catch errors early
      if (typeof fn !== 'function') {
        throw new Error(`Expected a function, but got: ${typeof fn}`);
      }
      fn(req, res, next).catch(next);
    };
  };