const { RANDOM_SEED } = require('../constants');
const { Network } = require('vis-network/standalone/esm/vis-network');

/**
 *  Function to translate the visjs graph to a svgjs friendly coordiante system by
 *  iterating over the nodes and converting their coordinates into DOM relative
 *  coordinates so it can be used by the svgjs render method
 *
 *  @param {object} network_config {nodes , edges}
 *          - nodes   An object of nodes obtained from @function getParsedInputGraph()
 *          - edges   An object of edges obtained from @function getParsedInputGraph()
 *
 *  @param {object} div
 *          - reference to the html div element on which the vis js graph will be drawn
 *          - this is different than the one on which svg graph will be drawn
 * @param {number} width
 *          - client width of the div
 * @param {number} height
 *          - client height of the div
 *
 * @return {object}  Translated coordinates for Nodes
 *
 */
exports.translateGraphCoordinates = (network_config, div, width, height) => {
  let network = new Network(
    div, // div container that points to a div which is outside the screen
    { nodes: network_config.parsed_nodes, edges: network_config.parsed_edges }, // nodes and edges
    {
      layout: { randomSeed: RANDOM_SEED },
      nodes: { fixed: true },
      // This should be #network-svg because we are rendering our result in div#network-svg
      height: `${height}px`,
      width: `${width}px`,
    } // options
  );

  let nodes_dom = new Map();

  // Loop over each node and get it's relative height and width for rendering it in DOM via svg.js
  for (let node in network.body.nodes) {
    // If the current point is mot an edge then add it to the nodes_dom JSON
    if (!node.startsWith('edgeId:')) {
      nodes_dom.set(
        node,
        network.canvasToDOM({
          x: network.body.nodes[node].x,
          y: network.body.nodes[node].y,
        })
      );
    }
  }

  return nodes_dom;
};

exports.scaleCoordinates = (nodes, width, height) => {
  let xArray = Array.from(nodes.values()).map((a) => {
    return a.x;
  });
  let yArray = Array.from(nodes.values()).map((a) => {
    return a.y;
  });
  let xRange = Math.max(...xArray) - Math.min(...xArray);
  let yRange = Math.max(...yArray) - Math.min(...yArray);

  if (xRange < width / 3) {
    let x0 = width / 2;
    nodes.forEach((v) => {
      // multiply by this, as multiplying
      // by 3 will send nodes off screen in edge cases
      v.x = (v.x - x0) * 2.8 + x0;
    });
  }
  if (yRange < height / 3) {
    let y0 = height / 2;
    nodes.forEach((v) => {
      // multiplying by 3 sends nodes off screen
      // this seems to work best
      v.y = (v.y - y0) * 2 + y0;
    });
  }
};
