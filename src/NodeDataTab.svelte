<script>
  import {
    setNodeMemory,
    setNodeFunction,
    getNodeFunction,
    getNodeMemory,
  } from '../lib';
  import { TextArea } from 'carbon-components-svelte';
  import { Grid, Row, Column } from 'carbon-components-svelte';
  import { Modal } from 'carbon-components-svelte';
  import { Button } from 'carbon-components-svelte';
  import { TextInput } from 'carbon-components-svelte';
  import { Tile } from 'carbon-components-svelte';

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
<Modal
  primaryButtonText="Set"
  secondaryButtonText="Cancel"
  bind:open
  modalHeading="Node {selected}"
  on:click:button--secondary={() => (open = false)}
  on:open
  on:close
  on:submit={submit}
>
  <Grid>
    <Row>
      <Column>
        <TextArea
          bind:value={mem}
          labelText="Node Memoey"
          placeholder="Node Memory"
          rows={15}
        />
      </Column>
      <Column>
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
    <Tile>Error : {error}</Tile>
  {/if}
</Modal>
