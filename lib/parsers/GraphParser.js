
const ParseGraph = (str) => {
  let edges=input.split(/[\s-]+/);
  if(edges.length & 1)
  {
    throw "Invalid String";
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
};

exports.ParseGraph = ParseGraph;
