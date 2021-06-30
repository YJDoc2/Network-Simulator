/**
 *
 * @param {string} objstr - input memory string given by user for the node
 * @returns {function}
 */
exports.getObject = (objstr) => {
  try {
    let evalString = `'use strict'; return ${objstr}`;
    let ret = new Function('', evalString)();
    return ret;
  } catch (e) {
    console.log(e);
    throw 'Error in parsing object';
  }
};

/**
 *
 * @param {string} fnstr - input function string given by user for the node
 * @returns {function}
 */
exports.getFunction = (fnstr) => {
  try {
    let evalString = `'use strict'; return ${fnstr}`;
    let ret = new Function('', evalString)();
    return ret;
  } catch (e) {
    console.log(e);
    throw 'Error in parsing function';
  }
};
