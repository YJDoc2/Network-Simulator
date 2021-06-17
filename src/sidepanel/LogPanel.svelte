<script>
  import { Logger } from '../../lib/logger';
  import { onMount, afterUpdate } from 'svelte';
  import { Button } from 'carbon-components-svelte';
  import DataView32 from 'carbon-icons-svelte/lib/DataView32';

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

<div style="display: flex;">
  <h3 style="flex:1">Logs</h3>
  <div>
    <Button
      kind="ghost"
      tooltipPosition="left"
      tooltipAlignment="start"
      iconDescription="See All Packets"
      icon={DataView32}
    />
  </div>
</div>
<br />
<div
  bind:this={scroll}
  style="overflow-y: scroll; max-height: 28rem; width:inherit "
>
  {#each logs as log}
    <p>{log}</p>
    <hr />
    <br />
  {/each}
</div>
<br />
