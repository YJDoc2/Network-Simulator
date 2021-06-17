exports.getObject = (objstr) => {
  try {
    let evalString = `return ${objstr}`;
    let ret = new Function('', evalString)();
    return ret;
  } catch (e) {
    console.log(e);
    throw 'Error in parsing object';
  }
};
