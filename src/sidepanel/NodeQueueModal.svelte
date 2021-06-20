<script>
  import { Modal } from 'carbon-components-svelte';
  import { Tile } from 'carbon-components-svelte';
  import { getNodeQueue } from '../../lib';

  export let selected = '';
  export let open = false;

  let queue = [];

  $: {
    queue = getNodeQueue(selected);
  }
</script>

<Modal
  passiveModal
  size="lg"
  hasScrollingContent={true}
  bind:open
  modalHeading="Node {selected}"
  on:open
  on:close
>
  {#each queue as packet}
    <Tile>
      {packet}
    </Tile>
  {/each}
</Modal>
