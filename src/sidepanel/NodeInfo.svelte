<script>
  import { getNodeList } from '../../lib';
  import { Tile } from 'carbon-components-svelte';
  import NodeQueueModal from './NodeQueueModal.svelte';
  import NodeDataModal from './NodeDataModal.svelte';
  import { ButtonSet, Button } from 'carbon-components-svelte';
  import { TextInput } from 'carbon-components-svelte';

  let nodes = getNodeList();
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

<h3>Nodes</h3>

<br />
<TextInput bind:value lableText="Search" placeholder="Search Node By Name" />
<div style="height:14rem; overflow-y: scroll;">
  {#each filteredNodes as node}
    <ButtonSet>
      <Tile>{node}</Tile>
      <Button
        kind="ghost"
        on:click={() => {
          selected = node;
          configOpen = true;
        }}>Config</Button
      >
      <Button
        kind="ghost"
        on:click={() => {
          selected = node;
          queueOpen = true;
        }}>Queue</Button
      >
    </ButtonSet>
    <hr />
  {/each}
</div>

<NodeDataModal {selected} bind:open={configOpen} />
<NodeQueueModal {selected} bind:open={queueOpen} />
