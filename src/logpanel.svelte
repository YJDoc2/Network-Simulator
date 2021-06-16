<script>
  import { Logger } from '../lib/logger';
  import { onMount, afterUpdate } from 'svelte';
  import { Tabs, Tab, TabContent } from 'carbon-components-svelte';
  import { Tile, Button } from 'carbon-components-svelte';

  let logs = [];

  let scroll;

  onMount(() => {
    Logger.subscribe((v) => {
      logs = v;
    });
  });
  afterUpdate(() => {
    scroll.scrollTop = scroll.scrollHeight;
  });
</script>

<Tabs>
  <Tab label="Logs" />
  <Tab label="Packtes" />

  <div slot="content">
    <TabContent>
      <div bind:this={scroll} style="overflow-y: scroll; max-height: 50rem; ">
        {#each logs as log}
          <Tile>{log}</Tile>
        {/each}
      </div>
    </TabContent>
    <TabContent
      >{#each Array(5) as _, i}
        <Tile>Packet {i + 1}</Tile>
      {/each}</TabContent
    >
  </div>
</Tabs>
