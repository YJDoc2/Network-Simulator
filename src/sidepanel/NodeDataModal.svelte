<script>
  import {
    setNodeMemory,
    setNodeFunction,
    getNodeFunction,
    getNodeMemory,
  } from "../../lib";
  import { TextArea } from "carbon-components-svelte";
  import { Grid, Row, Column } from "carbon-components-svelte";
  import { InlineNotification } from "carbon-components-svelte";
  import {
    ComposedModal,
    ModalHeader,
    ModalBody,
    ModalFooter,
  } from "carbon-components-svelte";

  export let selected = "";
  export let open = false;

  let mem = "";
  let fn = "";

  let error = "";

  $: {
    if (selected != "") {
      mem = getNodeMemory(selected);
      fn = getNodeFunction(selected);
    }
  }

  let submit = () => {
    try {
      setNodeMemory(selected, mem);
      setNodeFunction(selected, fn);
      error = "";
      open = false;
    } catch (e) {
      error = e;
    }
  };
</script>

<ComposedModal size="lg" bind:open on:open on:close on:submit={submit}>
  <ModalHeader label="Node {selected}" title="Node {selected} data" />
  <ModalBody>
    <Grid>
      <Row>
        <Column md={3}>
          <TextArea
            bind:value={mem}
            labelText="Node Memoey"
            placeholder="Node Memory"
            rows={25}
          />
        </Column>
        <Column md={2} />
        <Column md={3}>
          <TextArea
            bind:value={fn}
            labelText="Node Function"
            placeholder="Node Function"
            rows={25}
          />
        </Column>
      </Row>
    </Grid>
    {#if error !== ""}
      <InlineNotification
        lowContrast
        hideCloseButton
        kind="error"
        title="Error:"
        subtitle={error}
      />
    {/if}
  </ModalBody>
  <ModalFooter primaryButtonText="Set" secondaryButtonText="Cancel" />
</ComposedModal>
