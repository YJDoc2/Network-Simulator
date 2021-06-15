<script>
  import { getNodeList } from '../lib';
  import { Tabs, Tab, TabContent } from 'carbon-components-svelte';
  import NodeQueueTab from './NodeQueueTab.svelte';
  import NodeDataTab from './NodeDataTab.svelte';

  let nodes = getNodeList();
  let filteredNodes = nodes;
  let value = '';

  $: {
    const val = value.toLocaleLowerCase();
    filteredNodes = nodes.filter((node) => {
      return node.toLocaleLowerCase().includes(val);
    });
  }
</script>

<Tabs>
  <Tab label="Data" />
  <Tab label="Queue" />

  <div slot="content">
    <TabContent>
      <NodeDataTab bind:value bind:filteredNodes />
    </TabContent>
    <TabContent>
      <NodeQueueTab bind:value bind:filteredNodes />
    </TabContent>
  </div>
</Tabs>
