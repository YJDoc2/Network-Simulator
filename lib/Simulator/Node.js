// A Simple wrapper for functionality of a node
// even though setters are defined, the elements are meant to be accessed directly
// This does not do much info hiding , nor it is meant for that
// its just a simple wrapper, so single node's data can be easily managed and manipulated

class Node {
  name;
  neighbors = new Set();
  // For packets in the queue,
  // Each packet must be of form {id:Number,from :String,to:String, payload:Obj}
  // where from might be undefined/null
  queue = [];
  mem;
  fn;
  constructor(name) {
    this.name = name;
  }
  setMem(mem) {
    this.mem = mem;
  }
  setFn(fn) {
    this.fn = fn;
  }
}

exports.Node = Node;
