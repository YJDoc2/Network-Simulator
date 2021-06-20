<script>
  import {TranslateGraphCordinates} from '../lib/parsers';
  import { Modal, TextArea } from "carbon-components-svelte";

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
      console.log(graphList.toLocaleUpperCase());
			// TODO: Change below line to network_config=getParsedInputs();TranslateGraphCordinates(network_config);
			TranslateGraphCordinates({
				parsed_nodes: [
					{ id: 1, label: "Node 1" },
					{ id: 2, label: "Node 2" },
					{ id: 3, label: "Node 3" },
					{ id: 4, label: "Node 4" },
					{ id: 5, label: "Node 5" },
				],
				parsed_edges: [
					{ from: 1, to: 3 },
					{ from: 1, to: 2 },
					{ from: 2, to: 4 },
					{ from: 2, to: 5 },
					{ from: 3, to: 3 },
				],
			});
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
      {placeholder}
      on:change={() => {
        check();
      }}
      bind:value={graphList}
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
