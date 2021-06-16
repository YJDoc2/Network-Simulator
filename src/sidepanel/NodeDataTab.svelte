<script>
  import {
    setNodeMemory,
    setNodeFunction,
    getNodeFunction,
    getNodeMemory,
  } from '../../lib';
  import { TextArea } from 'carbon-components-svelte';
  import { Grid, Row, Column } from 'carbon-components-svelte';
  import { InlineNotification } from 'carbon-components-svelte';
  import { Button } from 'carbon-components-svelte';
  import { TextInput } from 'carbon-components-svelte';
  import {
    ComposedModal,
    ModalHeader,
    ModalBody,
    ModalFooter,
  } from 'carbon-components-svelte';

  export let value = '';
  export let filteredNodes = [];

  let selected = '';
  let open = false;

  let mem = '';
  let fn = '';

  let error = '';

  let submit = () => {
    try {
      setNodeMemory(selected, mem);
      setNodeFunction(selected, fn);
      error = '';
      open = false;
    } catch (e) {
      error = e;
    }
  };
</script>

<TextInput bind:value lableText="Search" placeholder="Search Node By Name" />
<div>
  {#each filteredNodes as node}
    <Button
      kind="ghost"
      on:click={() => {
        selected = node;
        mem = getNodeMemory(node);
        fn = getNodeFunction(node);
        open = true;
      }}>{node}</Button
    >
  {/each}
</div>
<ComposedModal bind:open on:open on:close on:submit={submit}>
  <ModalHeader label="Node {selected}" title="Node {selected} data" />
  <ModalBody>
    <Grid>
      <Row>
        <Column md={3}>
          <TextArea
            bind:value={mem}
            labelText="Node Memoey"
            placeholder="Node Memory"
            rows={15}
          />
        </Column>
        <Column md={2} />
        <Column md={3}>
          <TextArea
            bind:value={fn}
            labelText="Node Function"
            placeholder="Node Function"
            rows={15}
          />
        </Column>
      </Row>
    </Grid>
    {#if error !== ''}
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
