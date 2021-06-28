<script>
  import { translateGraphCoordinates, scaleCoordinates } from '../lib/util';
  import { Logger } from '../lib/logger';
  import { getSimulator, init } from '../lib/init';
  import { listener } from '../lib/init';
  import { SVG } from '@svgdotjs/svg.js';
  import { onMount } from 'svelte';
  import SidePanel from './sidepanel/SidePanel.svelte';
  import ControllBar from './ControllBar.svelte';
  import OpenNodeModal from './OpenNodeModal.svelte';
  import { Grid, Row, Column } from 'carbon-components-svelte';
  import { EDGE_COLOR, NODE_RADIUS, NODE_BACKGROUND } from '../lib/constants';
  import { saveToLocal } from '../lib/ToggleMenu/local';
  import { animate, sortPackets } from '../lib/animation';

  export let graphBase;
  export let name;

  let playing = false;
  let stopped = true;
  let selected;
  let openSelected = false;
  let SVGDiv;
  let VISDiv;
  let draw;

  const play = () => {
    if (!stopped) {
      let s = getSimulator();
      let q = s.step();
      if (q.length === 0) {
        Logger.log('All queues are empty, stopping.');
        playing = false;
        stopped = true;
        return;
      }
      let { duration: duration, sorted: sorted } = sortPackets(q);
      animate(draw, s, sorted);
      setTimeout(() => {
        s.nextEnqueue(q);
        play();
      }, duration);
    } else {
      playing = false;
    }
  };

  const step = () => {
    let s = getSimulator();
    let q = s.step();
    if (q.length === 0) {
      Logger.log('All queues are empty, stopping.');
      playing = false;
      stopped = true;
      return;
    }
    let { duration: duration, sorted: sorted } = sortPackets(q);
    animate(draw, s, sorted);
    setTimeout(() => {
      playing = false;
      stopped = true;
      s.nextEnqueue(q);
    }, duration);
  };

  const drawGraph = (sim) => {
    draw.clear();
    // Draw Edges
    let edge_lines = [];
    // Function for drawing an edge
    let nodes = sim.nodes;

    function DrawLine(edge) {
      let temp = draw.line(
        nodes.get(`${edge.from}`).x,
        nodes.get(`${edge.from}`).y,
        nodes.get(`${edge.to}`).x,
        nodes.get(`${edge.to}`).y
      );
      temp.stroke({ color: EDGE_COLOR, width: 7, linecap: "round" });
      edge_lines.push(temp);
    }
    sim.edges.forEach(DrawLine);

    // Draw Nodes
    let node_vertices = [];
    nodes.forEach((node, name) => {
      // Paint the background for the Network Node Image.
      // This ensures that the edge line doesnt display below the transparent svg
      draw
        .circle(NODE_RADIUS)
        .css('cursor', 'pointer')
        .fill(NODE_BACKGROUND)
        .stroke({ color: NODE_BACKGROUND, width: 2 })
        .move(node.x - NODE_RADIUS / 2, node.y - NODE_RADIUS / 2);
      node_vertices.push([
        name,
        draw
          .image('/network_node.svg')
          .move(node.x - NODE_RADIUS / 2, node.y - NODE_RADIUS / 2)
          .css('cursor', 'pointer'),
      ]);
      draw
        .plain(name)
        .font({ fill: "#000000", size: "2rem" })
        .move(
          // here we subtract 1 from node length to skip single lettered names
          node.x - NODE_RADIUS / 2 - (name.length - 1) * 5,
          node.y + NODE_RADIUS / 2
        );
    });

    node_vertices.forEach(([name, v]) => {
      v.click(() => {
        if (!playing) {
          openSelected = true;
          selected = name;
        }
      });
    });
  };

  onMount(() => {
    // Initialize SVG.JS
    if (draw) {
      draw.clear();
    }
    draw = SVG().addTo(SVGDiv).size(SVGDiv.clientWidth, SVGDiv.clientHeight);
    listener.subscribe(() => {
      try {
        let s = getSimulator();
        drawGraph(s);
        return;
      } catch (e) {
        console.log(e);
      }
    });
    try {
      let s = getSimulator();
      drawGraph(s);
      return;
    } catch (e) {
      console.log(e);
    }
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
    init(graphBase.parsed_nodes, graphBase.parsed_edges);

    //Initial save to library
    saveToLocal(name);
  });
</script>

<Grid condensed={true} noGutter={true}>
  <Row>
    <Column md={3}>
      <SidePanel {playing} />
    </Column>
    <Column md={5}>
      <ControllBar bind:animationPlaying={playing} bind:stopped {play} {step} />
      <div id="network-visjs" bind:this={VISDiv} />
      <div
        bind:this={SVGDiv}
        style="min-height: 85vh;box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
      "
      />
    </Column>
  </Row>
</Grid>

{#if openSelected}
  <OpenNodeModal bind:open={openSelected} bind:selected />
{/if}

<style>
  /* Hide the Visjs div. Note: Do not use display: none; here as it causes unexpected behaviour */
  #network-visjs {
    position: absolute;
    right: -100vw;
  }
</style>
