<script>
  import { Tabs, Tab, TabContent } from 'carbon-components-svelte';
  import { Tile } from 'carbon-components-svelte';
</script>

<Tabs>
  <Tab label="Logs" />
  <Tab label="Packtes" />

  <div slot="content">
    <TabContent>
      {#each Array(5) as _, i}
        <Tile>Log {i + 1}</Tile>
      {/each}
    </TabContent>
    <TabContent
      >{#each Array(5) as _, i}
        <Tile>Packet {i + 1}</Tile>
      {/each}</TabContent
    >
  </div>
</Tabs>
