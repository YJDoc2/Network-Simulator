<script>
  import { Logger } from '../../lib/logger';
  import { onMount, afterUpdate } from 'svelte';

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

<h3>Logs</h3>
<br />
<div bind:this={scroll} style="overflow-y: scroll; max-height: 28rem; ">
  {#each logs as log}
    <p>{log}</p>
    <hr />
    <br />
  {/each}
</div>
