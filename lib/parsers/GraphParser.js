const ParseGraph = (str) => {
	// add your code here
	throw "error string if any error";
	return "What you need to";
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
