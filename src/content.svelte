<script>
  import { Grid, Row, Column } from 'carbon-components-svelte';
  import { Button, TextArea } from 'carbon-components-svelte';
  import SidePanel from './sidepanel/SidePanel.svelte';
  import { enqueuePackets } from '../lib';
  import ArrowRight32 from 'carbon-icons-svelte/lib/ArrowRight32';
  let commands = '';
  let invalid = false;
  let invalidText = '';
</script>

<Grid condensed={true} noGutter={true}>
  <Row>
    <Column md={3}>
      <SidePanel />
    </Column>
    <Column md={5}>
      <div id="network-visjs" />
      <div id="network-svg" style="min-height:35rem" />
      <div style="position: relative;">
        <TextArea
          {invalid}
          {invalidText}
          style=" resize: none;display: block;"
          bind:value={commands}
          rows={10}
          labelText="Enqueue Packets"
          placeholder="> "
        />
        <Button
          style="position: absolute;bottom: 1rem;right: 0.5rem;"
          iconDescription="Enqueue Packets"
          icon={ArrowRight32}
          kind="tertiary"
          on:click={() => {
            try {
              enqueuePackets(commands);
              commands = '';
              invalid = false;
              invalidText = '';
            } catch (e) {
              if (typeof e === 'string') {
                invalidText = e;
              } else {
                invalidText = 'Error in parsing';
              }
            }
          }}
        />
      </div>
    </Column>
  </Row>
</Grid>
