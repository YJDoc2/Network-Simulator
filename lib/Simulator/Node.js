const { getObject, getFunction } = require('../JSParse');
const { Packets } = require('../packets');
// A Simple wrapper for functionality of a node
// even though setters are defined, the elements are meant to be accessed directly
// This does not do much info hiding , nor it is meant for that
// its just a simple wrapper, so single node's data can be easily managed and manipulated

class Node {
  name;
  x;
  y;
  neighbors = new Set();
  // For packets in the queue,
  // Each packet must be of form {id:Number,from :String,to:String, payload:Obj}
  // where from might be undefined/null
  queue = [];
  mem = {};
  fn = () => {
    return [];
  };
  memStr = '{}';
  fnStr = '()=>{return [];}';
  constructor(name, x, y) {
    this.name = name;
    this.x = x;
    this.y = y;
  }

  static fromSaved(saved) {
    if (
      !saved.name ||
      !saved.x ||
      !saved.y ||
      !saved.neighbors ||
      !saved.memStr ||
      !saved.fnStr
    ) {
      throw 'Invalid Saved Structure';
    }
    let n = new Node(saved.name, saved.x, saved.y);
    n.neighbors = new Set(saved.neighbors);
    if (saved.queue) {
      saved.queue.forEach((p) => {
        Packets.add(p);
      });
    }
    n.queue = saved.queue || [];
    n.memStr = saved.memStr;
    n.fnStr = saved.fnStr;
    n.mem = getObject(saved.memStr);
    n.fn = getFunction(saved.fnStr);
    return n;
  }
  setMem(mem) {
    this.mem = mem;
  }
  setFn(fn) {
    this.fn = fn;
  }

  toSave(withState) {
    return {
      name: this.name,
      x: this.x,
      y: this.y,
      neighbors: Array.from(this.neighbors),
      queue: withState ? this.queue : [],
      memStr: this.memStr,
      fnStr: this.fnStr,
    };
  }
}

exports.Node = Node;
