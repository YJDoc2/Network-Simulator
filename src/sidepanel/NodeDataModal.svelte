<script>
  import {
    setNodeMemory,
    setNodeFunction,
    getNodeFunction,
    getNodeMemory,
  } from "../../lib";
  import { TextArea } from "carbon-components-svelte";
  import { Grid, Row, Column } from "carbon-components-svelte";
  import { InlineNotification } from "carbon-components-svelte";
  import {
    ComposedModal,
    ModalHeader,
    ModalBody,
    ModalFooter,
  } from "carbon-components-svelte";

  export let selected = "";
  export let open = false;

  let mem = "";
  let fn = "";

  let error = "";

  $: {
    if (selected != "") {
      mem = getNodeMemory(selected);
      fn = getNodeFunction(selected);
    }
  }

  let submit = () => {
    try {
      setNodeMemory(selected, mem);
      setNodeFunction(selected, fn);
      error = "";
      open = false;
    } catch (e) {
      error = e;
    }
  };
</script>

<ComposedModal size="lg" bind:open on:open on:close on:submit={submit}>
  <ModalHeader label="Node {selected}" title="Node {selected} data" />
  <ModalBody style="padding:10px">
    <Grid>
      <Row>
        <Column md={3}>
          <TextArea
            bind:value={mem}
            id="memory"
            labelText="Node Memoey"
            placeholder="Node Memory"
            rows={25}
          />
          <script>
            var editor = CodeMirror.fromTextArea(
              document.getElementById("memory"),
              {
                lineNumbers: true,
                styleActiveLine: true,
                matchBrackets: true,
                mode: { json: true },
                styleSelectedText: true,
                indentWithTabs: true,
                autoCloseBrackets: true,
                lineWrapping: true,
              }
            );
          </script>
        </Column>
        <Column md={1} />
        <Column md={4}>
          <TextArea
            bind:value={fn}
            id="code"
            labelText="Node Function"
            placeholder="Node Function"
          />
          <script>
            var editor = CodeMirror.fromTextArea(
              document.getElementById("code"),
              {
                lineNumbers: true,
                styleActiveLine: true,
                matchBrackets: true,
                mode: "javascript",
                styleSelectedText: true,
                indentWithTabs: true,
                autoCloseBrackets: true,
                lineWrapping: true,
                // extraKeys: { "Ctrl-Space": "autocomplete" },
              }
            );
            editor.setOption("extraKeys", {
              "Cmd-E": "autocomplete",
              "Ctrl-Space": "autocomplete",
            });
            editor.on("inputRead", function (cm, event) {
              if (
                !cm.state
                  .completionActive /*Enables keyboard navigation in autocomplete list*/ &&
                event.keyCode != 13
              ) {
                /*Enter - do not open autocomplete list just after item has been selected in it*/
                CodeMirror.commands.autocomplete(cm, null, {
                  completeSingle: false,
                });
              }
            });
          </script>
        </Column>
      </Row>
    </Grid>
    {#if error !== ""}
      <InlineNotification
        lowContrast
        hideCloseButton
        kind="error"
        title="Error:"
        subtitle={error}
      />
    {/if}
  </ModalBody>
  <ModalFooter primaryButtonText="Set" secondaryButtonText="Cancel" />
</ComposedModal>
