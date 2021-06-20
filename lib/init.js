const { Simulator } = require('./Simulator');

// This implements singleton pattern for simulator,
// as we need only one same instance of it for the complete app

let simulator = null;

// creates and initialized new simulator
// must be called before getSimulator
exports.init = (nodes, edges) => {
  simulator = new Simulator(nodes, edges);
  return simulator;
};

// returns the initialized simulator
exports.getSimulator = () => {
  if (!simulator) {
    throw 'Tried to get Simlator instance before initialization';
  }
  return simulator;
};
