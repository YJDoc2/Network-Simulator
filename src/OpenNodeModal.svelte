<script>
  import { Modal, Button, ButtonSet } from 'carbon-components-svelte';
  import NodeDataModal from './sidepanel/NodeDataModal.svelte';
  import NodeQueueModal from './sidepanel/NodeQueueModal.svelte';

  export let open = false;
  export let selected = '';
  let configOpen = false;
  let queueOpen = false;
</script>

<Modal
  passiveModal
  size="xs"
  hasScrollingContent={false}
  bind:open
  modalHeading="Node {selected}"
  on:open
  on:close
>
  <ButtonSet>
    <Button
      kind="ghost"
      on:click={() => {
        configOpen = true;
      }}>Config</Button
    >
    <Button
      kind="ghost"
      on:click={() => {
        queueOpen = true;
      }}>Queue</Button
    >
  </ButtonSet>
</Modal>

{#if configOpen}
  <NodeDataModal {selected} bind:open={configOpen} />
{/if}
{#if queueOpen}
  <NodeQueueModal {selected} bind:open={queueOpen} />
{/if}
