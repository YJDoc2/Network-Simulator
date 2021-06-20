// Have to use require as using
// import { getObject } from '../JSParse/index.js';
// seems to break the export statement
const { getObject } = require('../JSParse/index.js');
const { DEFAULT_COLOR } = require('../constants');
// Format is > Node ; (Optional) Color ; packet > Node ; (Optional) Color ; packet ..
// this is called as command throughout
const ParseEnqueue = (str) => {
  let rest = str;
  let commands = [];
  // as the input might have multiple enqueue commands
  while (rest.length != 0) {
    if (rest[0] != '>') {
      throw "Each enqueue command must start with a '>'";
    }
    let i = 1; // skip the >
    while (rest[i] != ';') {
      i++;
    }
    let node = rest.substring(start, i).trim();
    rest = rest.substring(i + 1).trim();
    let color = DEFAULT_COLOR;
    // As we are trimming above, the first character must be { or # or color name char
    if (rest[0] != '{') {
      // not a json, so must be char
      let i = 0;
      while (rest[i] != ';') {
        i++;
      }
      color = rest.substring(color_start, i).trim();
      rest = rest.substring(i + 1).trim();
    }
    if (rest[0] != '{') {
      throw "Packet JSON must start with a '{'";
    }
    i = 0;
    // loop till next command, which will start with > is found
    while (rest[i] != '>' && i < rest.length) {
      i++;
    }
    let packet = rest.substring(packet_start, i).trim();
    // do not skip the > , as next iteration will check for it
    rest = rest.substring(i).trim();
    commands.push({ node: node, color: color, packet: getObject(packet) });
  }
  return commands;
};

exports.ParseEnqueue = ParseEnqueue;
