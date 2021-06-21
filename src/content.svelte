<script>
  import { TranslateGraphCordinates } from '../lib/parsers';
  import { enqueuePackets } from '../lib';
  import { SVG, Timeline } from '@svgdotjs/svg.js';
  import { onMount } from 'svelte';
  import SidePanel from './sidepanel/SidePanel.svelte';
  import { Grid, Row, Column } from 'carbon-components-svelte';
  import { Button, TextArea } from 'carbon-components-svelte';
  import ArrowRight32 from 'carbon-icons-svelte/lib/ArrowRight32';
  import { NODE_RADIUS, NODE_COLOR } from '../lib/constants';

  export let graphBase;

  let commands = '';
  let invalid = false;
  let invalidText = '';

  let SVGDiv;
  let VISDiv;
  onMount(() => {
    // Get Nodes that are friendly with DOM coordinate system
    const translated_nodes = TranslateGraphCordinates(
      graphBase,
      VISDiv,
      SVGDiv.clientWidth,
      SVGDiv.clientHeight
    );

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
        translated_nodes[`${edge.from}`].x,
        translated_nodes[`${edge.from}`].y,
        translated_nodes[`${edge.to}`].x,
        translated_nodes[`${edge.to}`].y
      );
      temp.stroke({ color: NODE_COLOR, width: 7, linecap: 'round' });
      edge_lines.push(temp);
    }
    graphBase.parsed_edges.forEach(DrawLine);

    // Draw Nodes
    let node_vertices = [];
    for (let node in translated_nodes) {
      node_vertices.push(
        draw
          .circle(NODE_RADIUS)
          .fill(NODE_COLOR)
          .stroke({ color: NODE_COLOR, width: 2 })
          .move(
            translated_nodes[node].x - NODE_RADIUS / 2,
            translated_nodes[node].y - NODE_RADIUS / 2
          )
      );
      draw
        .plain(node)
        .font({ fill: '#000000', size: '2rem' })
        .move(
          // here we subtract 1 from node length to skip single lettered names
          translated_nodes[node].x - NODE_RADIUS / 2 - (node.length - 1) * 5,
          translated_nodes[node].y + NODE_RADIUS / 2
        );
    }
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
      <div bind:this={SVGDiv} style="min-height:35rem" />
      <div style="position: relative;">
        <TextArea
          {invalid}
          {invalidText}
          style=" resize: none;display: block; box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;"
          bind:value={commands}
          rows={10}
          labelText="Enqueue Packets"
          placeholder="> "
        />
        <Button
          style="position: absolute;bottom: 1rem;right: 0.5rem;"
          iconDescription="Enqueue Packets"
          icon={ArrowRight32}
          kind="tertiary"
          on:click={() => {
            try {
              enqueuePackets(commands);
              commands = '';
              invalid = false;
              invalidText = '';
            } catch (e) {
              if (typeof e === 'string') {
                invalidText = e;
              } else {
                invalidText = 'Error in parsing';
              }
            }
          }}
        />
      </div>
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
