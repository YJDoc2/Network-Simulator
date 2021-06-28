<script>
  import { Modal } from "carbon-components-svelte";
  import { Tile, Button, InlineNotification } from "carbon-components-svelte";
  import { LOCAL_SAVE_KEY } from "../lib/constants";
  import { saveToLocal } from "../lib/ToggleMenu/local";

  export let loadProject;
  export let open = true;

  let projects = JSON.parse(localStorage.getItem(LOCAL_SAVE_KEY)) || {};
  let names = Object.keys(projects);
  let error = false;
</script>

<Modal passiveModal modalHeading="Load Saved" bind:open on:open on:close>
  {#each names as name}
    <Button
      kind="ghost"
      on:click={() => {
        try {
          loadProject(name);
          saveToLocal(name);
        } catch (e) {
          console.log(e);
          error = true;
        }
      }}
    >
      <Tile>
        {name}
      </Tile>
    </Button>
  {/each}
  {#if error}
    <InlineNotification
      lowContrast
      hideCloseButton
      kind="error"
      title="Error:"
      subtitle={"Error in Loading saved project"}
    />
  {/if}
</Modal>
