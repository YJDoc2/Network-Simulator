<script>
  import { Modal } from 'carbon-components-svelte';
  import { Tile } from 'carbon-components-svelte';
  import { TextArea, Button } from 'carbon-components-svelte';
  import ArrowRight32 from 'carbon-icons-svelte/lib/ArrowRight32';
  import { getNodeQueue, enqueuePackets } from '../../lib';
  import { onMount } from 'svelte';

  export let selected = '';
  export let open = false;

  let queue = [];
  let command = '';
  let invalid = false;
  let invalidText = '';

  let getPackets = () => {
    try {
      queue = [];
      let t = getNodeQueue(selected);
      t.forEach((p) => {
        queue.push(JSON.stringify(p.packet));
      });

      queue = queue;
    } catch (e) {
      console.log(e);
    }
  };

  onMount(() => {
    getPackets();
  });
</script>

<Modal
  passiveModal
  size="lg"
  hasScrollingContent={false}
  bind:open
  modalHeading="Node {selected}"
  on:open
  on:close
>
  <div style="overflow-y: scroll;height:50vh">
    {#each queue as packet}
      <Tile>
        {packet}
      </Tile>
    {/each}
  </div>
  <div style="max-height: 30vh;position: relative;">
    <TextArea
      {invalid}
      {invalidText}
      style=" resize: none;display: block; box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;"
      bind:value={command}
      rows={10}
      labelText="Enqueue Packets"
      placeholder="> "
    />
    <Button
      style="position: absolute;bottom: 1rem;right: 0.5rem;"
      iconDescription="Enqueue Packets"
      tooltipAlignment="start"
      tooltipPosition="left"
      icon={ArrowRight32}
      kind="tertiary"
      on:click={() => {
        try {
          enqueuePackets(selected, command);
          getPackets();
          command = '';
          invalid = false;
          invalidText = '';
        } catch (e) {
          invalid = true;
          if (typeof e === 'string') {
            invalidText = e;
          } else {
            invalidText = 'Error in parsing';
          }
        }
      }}
    />
  </div>
</Modal>
