/*
 *  Function to parse the Nodes and Edges of a graph from an input string
 *
 *  @param  string   Input submitted to the Nodes Modal
 *
 *  @return object   Translated coordinates for Nodes
 *
 */
const ParseGraph = (str) => {
	// add your code here
	let edges = input.split(/[\s-]+/);
	if (edges.length & 1) {
		throw "Invalid String";
	}
	console.log(edges);
	let parsed_input_nodes = [];
	let parsed_input_edges = [];
	var nodes = new Map();
	let count = 1;
	for (let i = 0; i < edges.length; i += 2) {
		let first_node = edges[i];
		let second_node = edges[i + 1];
		if (!nodes.has(first_node)) {
			nodes.set(first_node, count);
			count = count + 1;
		}
		if (!nodes.has(second_node)) {
			nodes.set(second_node, count);
			count = count + 1;
		}
	}
	for (let i = 0; i < edges.length; i += 2) {
		let first_node = edges[i];
		let second_node = edges[i + 1];
		parsed_input_edges.push({
			from: nodes.get(first_node),
			to: nodes.get(second_node),
		});
	}
	for (let [key, value] of nodes) {
		parsed_input_nodes.push({ id: value, label: key });
	}
	let obj = {
		parsed_edges: parsed_input_edges,
		parsed_nodes: parsed_input_nodes,
		error: false,
	};
	return obj;
};

/*
 *  Function to translate the visjs graph to a svgjs friendly coordiante system by
 *  iterating over the nodes and converting their coordinates into DOM relative
 *  coordinates so it can be used by the svgjs render method
 *
 *  @param  object  network_config {nodes , edges}
 *           - nodes   An object of nodes obtained from @function getParsedInputGraph()
 *           - edges   An object of edges obtained from @function getParsedInputGraph()
 *
 *  @return object   Translated coordinates for Nodes
 *
 */
const TranslateGraphCordinates = (network_config) => {
	let network = new window.vis.Network(
		document.getElementById("network-visjs"), // div container
		{ nodes: network_config.parsed_nodes, edges: network_config.parsed_edges }, // nodes and edges
		{
			nodes: { fixed: true },
			layout: { randomSeed: 0 },
			height: `${document.getElementById("network-visjs").clientHeight}px`,
			width: `${document.getElementById("network-visjs").clientWidth}px`,
		} // options
	);

	let nodes_dom = {};

	// Loop over each node and get it's relative height and width for rendering it in DOM via svg.js
	for (var node in network.body.nodes) {
		// If the current point is mot an edge then add it to the nodes_dom JSON
		if (!node.startsWith("edgeId:")) {
			nodes_dom[node] = network.canvasToDOM({
				x: network.body.nodes[node].x,
				y: network.body.nodes[node].y,
			});
		}
	}
	// console.log(nodes_dom); // debug
	return nodes_dom;
};

exports.ParseGraph = ParseGraph;
exports.TranslateGraphCordinates = TranslateGraphCordinates;
