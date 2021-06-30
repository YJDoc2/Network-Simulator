<script>

  import { ParseGraph } from "../lib/parsers";
  import { clear } from "../lib/init";
  import {
    TextArea,
    InlineNotification,
    TextInput,
  } from "carbon-components-svelte";
  import {
    ComposedModal,
    ModalHeader,
    ModalBody,
    ModalFooter,
  } from "carbon-components-svelte";

  export let graphBase;
  export let name = "Untitled";


  let error = false;
  let graphList = "";
  let src = 'utils/graph.png';

  let invalid = false;
  const placeholder = "A-B\nA-C\nC-D";
  let open = true;

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
        clear();
      } catch (e) {
        console.log(e);
        error = true;
      }

    }
  };
</script>

<ComposedModal
  size="lg"
  bind:open
  on:open
  on:close
  on:submit={() => {
    passGraphList();
  }}
  preventCloseOnClickOutside
>

  <ModalHeader title="Create Network" />
  <ModalBody>
    <TextInput
      placeholder="Enter project Name"
      required
      label="Project Name"
      style="max-width:max-content;font-size: 18px;"
      bind:value={name}

    />
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
    </div>
    {#if error}
      <InlineNotification
        lowContrast
        hideCloseButton
        kind="error"
        title="Error:"
        subtitle={"Please Enter Valid Input"}
      />
    {/if}
  </ModalBody>
  <ModalFooter primaryButtonText="Create" />
</ComposedModal>

<style>
  #eg-img {
    height: 250px;
    width: 300px;
  }
</style>
