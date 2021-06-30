const { getSimulator } = require('./init');
const { getObject, getFunction } = require('./JSParse');
const { ParseEnqueue } = require('./parsers');
const { ENQUEUED } = require('./constants');
// Main index file of js lib

// currently these have code commented with dummy returns,
// as simulator will not be set up, and thus in testing these will throw error
// when the graph parser will be set up and everything will get connected, code can be uncommented

exports.getNodeList = () => {
  const sim = getSimulator();
  return Array.from(sim.nodes.keys());
};

exports.getNodeMemory = (node) => {
  const sim = getSimulator();
  let mem = sim.nodes.get(node)?.memStr;
  return mem;
};
exports.getNodeFunction = (node) => {

  // const sim = getSimulator();
  // let mem = sim.nodes.get(node)?.fnStr;
  // return mem || '';
  return 'Node Function String';


}


exports.setNodeMemory = (node, memoryString) => {
  const sim = getSimulator();
  let n = sim.nodes.get(node);
  if (!n) {
    return;
  }
  try {
    let mem = getObject(memoryString);
    n.memStr = memoryString;
    n.mem = mem;
  } catch (e) {
    throw 'Error in parsing memory JSON';
  }
};
exports.setNodeFunction = (node, functionString) => {
  const sim = getSimulator();
  let n = sim.nodes.get(node);
  if (!n) {
    return;
  }
  try {
    let fn = getFunction(functionString);
    n.fnStr = functionString;
    n.fn = fn;
  } catch (e) {
    throw 'Error in parsing function string';
  }
};

exports.enqueuePackets = (node, str) => {
  try {
    const sim = getSimulator();
    let p = ParseEnqueue(str);
    sim.enqueuePacket(node, p);
  } catch (e) {
    console.log(e);
    throw e;
  }
};


exports.getNodeQueue = (node) => {
  const sim = getSimulator();
  let q = sim.nodes.get(node)?.queue;
  return q || [];
};
