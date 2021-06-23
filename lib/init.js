const { Simulator } = require('./Simulator');
const { writable } = require('svelte/store');
const { Packets } = require('./packets');
const { Logger } = require('./logger');

// This implements singleton pattern for simulator,
// as we need only one same instance of it for the complete app

let simulator = null;
const listener = writable(simulator);
// creates and initialized new simulator
// must be called before getSimulator
exports.init = (nodes, edges) => {
  simulator = new Simulator(nodes, edges);
  listener.set(simulator);
  return simulator;
};

exports.fromSaved = (str) => {
  Packets.clear();
  Logger.clear();
  simulator = Simulator.FromSaved(str);
  listener.set(simulator);
  return simulator;
};

// returns the initialized simulator
exports.getSimulator = () => {
  if (!simulator) {
    throw 'Tried to get Simlator instance before initialization';
  }
  return simulator;
};

exports.clear = () => {
  simulator = null;
  listener.set(simulator);
};

exports.listener = listener;
