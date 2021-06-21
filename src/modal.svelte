<script>
  import { ParseGraph } from '../lib/parsers';
  import { Modal, TextArea } from 'carbon-components-svelte';

  export let graphBase;

  let open = true;
  let error = false;
  let graphList = '';
  let src = 'utils/graph.png';
  let invalid = false;
  const placeholder = 'A-B\nA-C\nC-D';

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
      try {
        // Parse the Input string and get Edges & Nodes in Vis.js compatible format
        graphBase = ParseGraph(graphList.toUpperCase().trim());
        open = false;
      } catch (e) {
        error = true;
      }
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
  on:click:button--secondary={() => {}}
  on:open
  on:close={() => {
    open = false;
  }}
  on:submit={() => {
    passGraphList();
  }}
>
  <div>
    <p>Example:</p>
    <img {src} id="eg-img" alt="Graph" />
    <p>A-B A-C C-D</p>
  </div>
  <div>
    <TextArea
      {invalid}
      labelText="Enter Graph structure"
      bind:value={graphList}
      {placeholder}
      on:change={() => {
        check();
      }}
    />

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
</style>
