<script>
  import { translateGraphCoordinates, scaleCoordinates } from '../lib/util';
  import { init } from '../lib/init';
  import { SVG, Timeline } from '@svgdotjs/svg.js';
  import { onMount } from 'svelte';
  import SidePanel from './sidepanel/SidePanel.svelte';
  import { Grid, Row, Column } from 'carbon-components-svelte';
  import { NODE_RADIUS, NODE_COLOR } from '../lib/constants';

  export let graphBase;

  let SVGDiv;
  let VISDiv;
  onMount(() => {
    // Get Nodes that are friendly with DOM coordinate system
    const translated_nodes = translateGraphCoordinates(
      graphBase,
      VISDiv,
      SVGDiv.clientWidth,
      SVGDiv.clientHeight
    );
    // scale the coordinates, so that if x or y range is less than third of width
    // or height respectively, it will be scaled up
    scaleCoordinates(translated_nodes, SVGDiv.clientWidth, SVGDiv.clientHeight);

    graphBase.parsed_nodes.forEach((node) => {
      let n = translated_nodes.get(node.id);
      node.x = n.x;
      node.y = n.y;
    });
    const sim = init(graphBase.parsed_nodes, graphBase.parsed_edges);

    // Initialize SVG.JS
    let drawingDiv = SVGDiv;
    let draw = SVG()
      .addTo(drawingDiv)
      .size(drawingDiv.clientWidth, drawingDiv.clientHeight);
    // Draw Edges
    let edge_lines = [];
    // Function for drawing an edge
    function DrawLine(edge) {
      let temp = draw.line(
        translated_nodes.get(`${edge.from}`).x,
        translated_nodes.get(`${edge.from}`).y,
        translated_nodes.get(`${edge.to}`).x,
        translated_nodes.get(`${edge.to}`).y
      );
      temp.stroke({ color: NODE_COLOR, width: 7, linecap: 'round' });
      edge_lines.push(temp);
    }
    graphBase.parsed_edges.forEach(DrawLine);

    // Draw Nodes
    let node_vertices = [];
    translated_nodes.forEach((node, name) => {
      node_vertices.push(
        draw
          .circle(NODE_RADIUS)
          .fill(NODE_COLOR)
          .stroke({ color: NODE_COLOR, width: 2 })
          .move(node.x - NODE_RADIUS / 2, node.y - NODE_RADIUS / 2)
      );
      draw
        .plain(name)
        .font({ fill: '#000000', size: '2rem' })
        .move(
          // here we subtract 1 from node length to skip single lettered names
          node.x - NODE_RADIUS / 2 - (name.length - 1) * 5,
          node.y + NODE_RADIUS / 2
        );
    });
  });

  // let timeline = new Timeline();
  // c3.timeline(timeline);
  // c4.timeline(timeline);
  // c3.animate(1000, 0, "absolute").move(170, 120);
  // c4.animate(1000, 0, "absolute").move(40, 80);
</script>

<Grid condensed={true} noGutter={true}>
  <Row>
    <Column md={3}>
      <SidePanel />
    </Column>
    <Column md={5}>
      <div id="network-visjs" bind:this={VISDiv} />
      <div bind:this={SVGDiv} style="min-height: 57.5vh" />
    </Column>
  </Row>
</Grid>

<style>
  /* Hide the Visjs div. Note: Do not use display: none; here as it causes unexpected behaviour */
  #network-visjs {
    position: absolute;
    right: -100vw;
  }
</style>
