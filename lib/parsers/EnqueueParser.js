// Have to use require as using
// import { getObject } from '../JSParse/index.js';
// seems to break the export statement
const { getObject } = require('../JSParse/index.js');
const { PACKET_COLOR } = require('../constants');
// Format is (Optional) Color ; packet
// this is called as command throughout
/**
 *
 * @param {string} str - Enqueue packet String
 * @returns {object} {color, packet}
 */
const ParseEnqueue = (str) => {
  let rest = str.trim();
  let i = 0;
  let color = PACKET_COLOR;
  // As we are trimming above, the first character must be { or # or color name char
  if (rest[0] != '{') {
    // not a json, so must be char
    let i = 0;
    while (rest[i] != ';' && i < rest.length) {
      i++;
    }
    color = rest.substring(0, i).trim();
    rest = rest.substring(i + 1).trim();
  }
  if (rest[0] != '{') {
    throw "Packet JSON must start with a '{'";
  }
  return { color: color, packet: getObject(rest) };
};

exports.ParseEnqueue = ParseEnqueue;
