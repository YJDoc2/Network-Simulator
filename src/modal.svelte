<script>
  import { ParseGraph, TranslateGraphCordinates } from "../lib/parsers";
  import { Modal, TextArea } from "carbon-components-svelte";
  import { SVG, Timeline } from "@svgdotjs/svg.js";

  let open = true;
  let error = false;
  let graphList = "";
  let src = "utils/graph.png";

  let invalid = false;
  const placeholder = "A-B\nA-C\nC-D";
  const check = () => {
    if (graphList.length <= 0) {
      error = true;
    } else {
      error = false;
    }
  };
  // Function to pass the input to backend
  const passGraphList = () => {
    if (graphList.length <= 0) {
      error = true;
    } else {
      open = false;

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

      // let timeline = new Timeline();
      // c3.timeline(timeline);
      // c4.timeline(timeline);
      // c3.animate(1000, 0, "absolute").move(170, 120);
      // c4.animate(1000, 0, "absolute").move(40, 80);
    }
  };
</script>

<Modal
  bind:open
  preventCloseOnClickOutside
  size="lg"
  modalHeading="Create Graph"
  primaryButtonText="Create"
  secondaryButtonText="Cancel"
  on:click:button--secondary={() => {
    //open = false;
  }}
  on:open
  on:close={() => {
    open = false;
  }}
  on:submit={() => {
    passGraphList();
  }}
>
  <div class="modal-body">
    <p>Example:</p>
    <img {src} id="eg-img" alt="Graph" />
    <p>A-B A-C C-D</p>
  </div>
  <div class="modal-body">
    <!-- <label style="font-size: large; padding-top: 2em;"
      >Enter input -->
    <TextArea
      {invalid}
      labelText="Enter Graph structure"
      bind:value={graphList}
      {placeholder}
      on:change={() => {
        check();
      }}
    />
    <!-- <input
        type="text"
        bind:value={graphList}
        on:input={() => {
          check();
        }}
      /> -->
    <!-- </label> -->

    {#if error}
      <p style="color: red;">Please enter valid input!</p>
    {/if}
  </div>
</Modal>

<style>
  #eg-img {
    height: 250px;
    width: 300px;
  }
  /* input {
    width: 20em;
    border-radius: 15px;
    border-color: black;
    outline: none;
    text-transform: uppercase;
  } */
</style>
