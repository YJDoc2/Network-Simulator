<script>
  import { getNodeList } from '../../lib';
  import { listener } from '../../lib/init';
  import { Tile } from 'carbon-components-svelte';
  import NodeQueueModal from './NodeQueueModal.svelte';
  import NodeDataModal from './NodeDataModal.svelte';
  import { ButtonSet, Button } from 'carbon-components-svelte';
  import { TextInput } from 'carbon-components-svelte';

  export let playing = false;

  let nodes = [];
  listener.subscribe((sim) => {
    if (sim) {
      nodes = getNodeList();
    }
  });
  let filteredNodes = nodes;
  let value = '';
  let configOpen = false;
  let queueOpen = false;
  let selected = '';
  $: {
    const val = value.toLocaleLowerCase();
    filteredNodes = nodes.filter((node) => {
      return node.toLocaleLowerCase().includes(val);
    });
  }
</script>

<div class="paper">
  <h3>Nodes</h3>

  <br />
  <TextInput bind:value lableText="Search" placeholder="Search Node By Name" />
  <div style="height:30vh; overflow-y: scroll;">
    {#each filteredNodes as node}
      <div style="width:10vw">
        <ButtonSet>
          <Tile>{node}</Tile>
          <Button
            disabled={playing}
            kind="ghost"
            on:click={() => {
              selected = node;
              configOpen = true;
            }}>Config</Button
          >
          <Button
            disabled={playing}
            kind="ghost"
            on:click={() => {
              selected = node;
              queueOpen = true;
            }}>Queue</Button
          >
        </ButtonSet>
      </div>
      <hr />
    {/each}
  </div>
</div>

{#if configOpen}
  <NodeDataModal {selected} bind:open={configOpen} />
{/if}
{#if queueOpen}
  <NodeQueueModal {selected} bind:open={queueOpen} />
{/if}
