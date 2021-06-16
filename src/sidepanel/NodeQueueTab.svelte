<script>
  import { TextInput } from 'carbon-components-svelte';
  import { Modal } from 'carbon-components-svelte';
  import { Button, Tile } from 'carbon-components-svelte';
  import { getNodeQueue } from '../../lib';

  export let value = '';
  export let filteredNodes = [];

  let seleted = '';
  let queue = [];

  $: {
    queue = getNodeQueue(seleted);
  }
  let open = false;
</script>

<TextInput bind:value lableText="Search" placeholder="Search Node By Name" />
{#each filteredNodes as node}
  <Button
    kind="ghost"
    on:click={() => {
      seleted = node;
      open = true;
    }}>{node}</Button
  >
{/each}
<Modal
  passiveModal
  size="lg"
  hasScrollingContent={true}
  bind:open
  modalHeading="Node {seleted}"
  on:open
  on:close
>
  {#each queue as packet}
    <Tile>
      {packet}
    </Tile>
  {/each}
</Modal>
