<script>
  import { Logger } from "../../lib/logger";
  import { Packets } from "../../lib/packets";
  import { onMount, afterUpdate } from "svelte";
  import { Button, Modal, Tile } from "carbon-components-svelte";
  import DataView32 from "carbon-icons-svelte/lib/DataView32";

  let logs = [];
  let packets = [];
  let scroll;
  let open = false;

  onMount(() => {
    Logger.subscribe((v) => {
      logs = v;
    });
    Packets.subscribe((p) => {
      packets = p;
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
      on:click={() => {
        open = true;
      }}
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

<Modal
  passiveModal
  size="lg"
  hasScrollingContent={true}
  bind:open
  modalHeading="Packet History"
  on:open
  on:close
>
  {#each packets as packet}
    <Tile>
      {packet}
    </Tile>
  {/each}
</Modal>
