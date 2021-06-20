const { getSimulator } = require('./init');
const { getObject, getFunction } = require('./JSParse');
const { ParseEnqueue } = require('./parsers');
const { ENQUEUED } = require('./constants');
// Main index file of js lib

// currently these have code commented with dummy returns,
// as simulator will not be set up, and thus in testing these will throw error
// when the graph parser will be set up and everything will get connected, code can be uncommented

exports.getNodeList = () => {
  // const sim = getSimulator();
  // return Array.from(sim.nodes.keys());
  return ['A', 'B', 'C', 'D', 'E'];
};

exports.getNodeMemory = (node) => {
  // const sim = getSimulator();
  // let mem = sim.nodes.get(node)?.memStr;
  // return mem || '';
  return 'Node Memory JSON';
};
exports.getNodeFunction = (node) => {
  // const sim = getSimulator();
  // let mem = sim.nodes.get(node)?.fnStr;
  // return mem || '';
  return 'Node Function String';

exports.getParsedInputGraph = (input) =>{
    let edges=input.split(/[\s-]+/);
    if(edges.length & 1)
    {
      return {error:true,msg:"Invalid Input"};
    }
    console.log(edges);
    let parsed_input_nodes=[];
    let parsed_input_edges=[];
    var nodes = new Map();
    let count=1;
    for(let i=0;i<edges.length;i+=2)
    { 
      let first_node=edges[i];
      let second_node=edges[i+1];
      if(!nodes.has(first_node))
      {
        nodes.set(first_node,count);
        count=count+1;
      }
      if(!nodes.has(second_node))
      {
        nodes.set(second_node,count);
        count=count+1;
      }
    }
    for(let i=0;i<edges.length;i+=2)
    {
      let first_node=edges[i];
      let second_node=edges[i+1];
      parsed_input_edges.push({from:nodes.get(first_node),to:nodes.get(second_node)});
    }
    for (let [key, value] of nodes) {
      parsed_input_nodes.push({id:value,label:key});
    }
    let obj={
      parsed_edges:parsed_input_edges,
      parsed_nodes:parsed_input_nodes,
      error:false
    }
    return obj;
}
// These two must throw a string in case of error
exports.setNodeMemory = (node, memoryString) => {};
exports.setNodeFunction = (node, functionString) => {};

exports.setNodeMemory = (node, memoryString) => {
  // const sim = getSimulator();
  // let n = sim.nodes.get(node);
  // if (!n) {
  //   return;
  // }
  // try {
  //   let mem = getObject(memoryString);
  //   n.memStr = memoryString;
  //   n.mem = mem;
  // } catch (e) {
  //   throw 'Error in parsing memory JSON';
  // }
};
exports.setNodeFunction = (node, functionString) => {
  // const sim = getSimulator();
  // let n = sim.nodes.get(node);
  // if (!n) {
  //   return;
  // }
  // try {
  //   let fn = getFunction(functionString);
  //   n.fnStr = functionString;
  //   n.fn = fn;
  // } catch (e) {
  //   throw 'Error in parsing function string';
  // }
};

exports.enqueuePackets = (str) => {
  // try {
  //   const sim = getSimulator();
  //   let packets = ParseEnqueue(str);
  //   packets.forEach((p) => {
  //     sim.enqueuePacket(p.node, p.packet);
  //   });
  // } catch (e) {
  //   console.log(e);
  //   throw e;
  // }
};


exports.getNodeQueue = (node) => {
  // const sim = getSimulator();
  // let q = sim.nodes.get(node)?.queue;
  // return q || [];
  return ['Packet 1', 'Packet 2'];
};
