<script>
  import Modal from "sv-bootstrap-modal";
  let isOpen = true;
  let error = false;
  let graphList = "";
  let src = "utils/graph.png";
  const check = () => {
    if (graphList.length <= 0) {
      error = true;
    } else {
      error = false;
    }
  };
  // Function to pass the input to backend
  const passGraphList = () => {
    if (graphList.length <= 0) {
      error = true;
    } else {
      isOpen = false;
      console.log(graphList.toLocaleUpperCase());
    }
  };
</script>

<Modal bind:open={isOpen} dialogClasses="modal-lg modal-dialog-centered">
  <div class="modal-header">
    <h3 class="modal-title">Create Graph</h3>
    <!-- <button type="button" class="close" on:click={() => (isOpen = false)}>
          <span aria-hidden="true">&times;</span>
        </button> -->
  </div>
  <div class="modal-body">
    <p>Example:</p>
    <img {src} style="height: 250px;width: 300px;" alt="Graph" />
    <p>List for above graph: "A-B A-C C-D"</p>
  </div>
  <div class="modal-body">
    <label style="font-size: large;"
      >Enter input <input
        type="text"
        bind:value={graphList}
        on:input={() => {
          check();
        }}
        style="width:20em;border-radius: 15px;border-color: black;outline: none;text-transform: uppercase;"
      /></label
    >

    {#if error}
      <p style="color: red;">Please enter valid input!</p>
    {/if}
  </div>
  <div class="modal-footer">
    <button
      type="button"
      class="btn btn-primary"
      on:click={() => {
        passGraphList();
      }}>Create</button
    >
  </div>
</Modal>

<style>
  @import url("https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css");
</style>
