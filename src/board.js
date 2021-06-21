import { SVG } from "@svgdotjs/svg.js";
import { ParseGraph, TranslateGraphCordinates } from "../lib/parsers";

export const draw = (graphList) => {
  // Parse the Input string and get Edges & Nodes in Vis.js compatible format
  const network_config = ParseGraph(graphList.toUpperCase().trim());

  // Get Nodes that are friendly with DOM coordinate system
  const translated_nodes = TranslateGraphCordinates(network_config);

  // Initialize SVG.JS
  let drawingDiv = document.getElementById("network-svg");
  let draw = SVG()
    .addTo(drawingDiv)
    .size(drawingDiv.clientWidth, drawingDiv.clientHeight);

  // Draw Nodes
  let node_vertices = [];
  for (var node in translated_nodes) {
    node_vertices.push(
      draw
        .circle(50)
        .attr({ fill: "#f06" })
        .move(translated_nodes[node].x - 25, translated_nodes[node].y - 25)
    );
  }

  // Draw Edges
  let edge_lines = [];
  // Function for drawing an edge
  function DrawLine(edge) {
    let temp = draw.line(
      translated_nodes[`${edge.from}`].x,
      translated_nodes[`${edge.from}`].y,
      translated_nodes[`${edge.to}`].x,
      translated_nodes[`${edge.to}`].y
    );
    temp.stroke({ color: "#f06", width: 7, linecap: "round" });
    edge_lines.push(temp);
  }
  network_config.parsed_edges.forEach(DrawLine);
  console.log(drawingDiv);
};
