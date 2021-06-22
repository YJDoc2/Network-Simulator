/*
 *  Function to parse the Nodes and Edges of a graph from an input string
 *
 *  @param  string   Input submitted to the Nodes Modal
 *
 *  @return object   Translated coordinates for Nodes
 *
 */
const ParseGraph = (input) => {
  let edges = input.split(/[\s-]+/);
  if (edges.length & 1) {
    throw 'Invalid configuration';
  }
  let parsed_input_nodes = [];
  let parsed_input_edges = [];
  let nodes = new Set();

  for (let i = 0; i < edges.length; i++) {
    nodes.add(edges[i]);
  }
  for (let i = 0; i < edges.length; i += 2) {
    let from = edges[i];
    let to = edges[i + 1];
    parsed_input_edges.push({
      from: from,
      to: to,
    });
  }
  for (let node of nodes) {
    parsed_input_nodes.push({ id: node, label: node });
  }
  let obj = {
    parsed_edges: parsed_input_edges,
    parsed_nodes: parsed_input_nodes,
  };
  return obj;
};

exports.ParseGraph = ParseGraph;
