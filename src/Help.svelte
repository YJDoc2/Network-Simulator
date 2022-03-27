<script>
  import {
    ComposedModal,
    ModalHeader,
    ModalBody,
  } from "carbon-components-svelte";
  import { onMount } from "svelte";
  export let open = false;
  const changeVisibility = (divName) => {
    let homeDiv = document.getElementById("Home");
    let createDiv = document.getElementById("Create");
    let configDiv = document.getElementById("Config");
    let queueDiv = document.getElementById("Queue");
    if (divName === "Home") {
      homeDiv.setAttribute("style", "display:block;");
      createDiv.setAttribute("style", "display:none");
      configDiv.setAttribute("style", "display:none");
      queueDiv.setAttribute("style", "display:none");
    } else if (divName === "Create") {
      homeDiv.setAttribute("style", "display:none");
      createDiv.setAttribute("style", "display:block");
      configDiv.setAttribute("style", "display:none");
      queueDiv.setAttribute("style", "display:none");
    } else if (divName === "Config") {
      homeDiv.setAttribute("style", "display:none");
      createDiv.setAttribute("style", "display:none");
      configDiv.setAttribute("style", "display:block");
      queueDiv.setAttribute("style", "display:none");
    } else {
      homeDiv.setAttribute("style", "display:none");
      createDiv.setAttribute("style", "display:none");
      configDiv.setAttribute("style", "display:none");
      queueDiv.setAttribute("style", "display:block");
    }
  };
  onMount(() => {
    changeVisibility("Home");
  });
</script>

<ComposedModal
  passiveModal
  size="lg"
  bind:open
  modalHeading="Help"
  on:open
  on:close
>
  <ModalHeader title="Help" />
  <ModalBody style="padding: 20px;">
    <div class="headerSelection">
      <div
        class="headerText"
        on:click={() => {
          changeVisibility("Home");
        }}
      >
        Home Page
      </div>
      <div
        class="headerText"
        on:click={() => {
          changeVisibility("Create");
        }}
      >
        Create
      </div>
      <div
        class="headerText"
        on:click={() => {
          changeVisibility("Config");
        }}
      >
        Config
      </div>
      <div
        class="headerText"
        on:click={() => {
          changeVisibility("Queue");
        }}
      >
        Queue
      </div>
    </div>
    <div style="border: solid #FFD700; border-radius: 1rem;">
      <div id="Home" class="imageDiv">
        <img src="/utils/Net_Home.png" alt="" class="image" />
        <div style="margin: 2rem; font-size: 1.5rem;">
          <section>
            <h2 style="font-weight: bold;">Miscellaneous:</h2>

            <ol type="1" style="list-style: decimal;">
              <li>
                Use <i style="font-style: italic;font-weight: bold;">CTRL+S</i> or
                save button in navbar/sidebar to save the current state of simulation
              </li>
              <li>Download the simulation</li>
              <li>Upload the simulation</li>
              <li>Save the simulation to local library</li>
              <li>Upload the simulation from local library</li>
            </ol>
          </section>
        </div>
      </div>
      <div id="Create">
        <img src="/utils/Net_Create.png" alt="" class="image" />
      </div>
      <div id="Config">
        <img src="/utils/Net_Config.png" alt="" class="image" />
      </div>
      <div id="Queue">
        <img src="/utils/Net_Queue.png" alt="" class="image" />
      </div>
    </div>
  </ModalBody>
</ComposedModal>

<style>
  .headerSelection {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .headerText {
    font-size: 1rem;
    cursor: pointer;
    font-weight: bold;
  }
  .headerText:hover {
    color: #ffd700;
    border: solid;
  }

  .image {
    height: 100%;
    width: 100%;
    display: block;
    margin-left: auto;
    margin-right: auto;
    border-radius: 1rem;
  }
</style>
