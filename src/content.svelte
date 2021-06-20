<script>
  import { onMount } from 'svelte';
  import { Grid, Row, Column } from 'carbon-components-svelte';
  import { Button, TextArea } from 'carbon-components-svelte';
  import SidePanel from './sidepanel/SidePanel.svelte';
  import { enqueuePackets } from '../lib';
  import ArrowRight32 from 'carbon-icons-svelte/lib/ArrowRight32';
  import { SVG, Timeline } from '@svgdotjs/svg.js';
  let div;
  let commands = '';
  let invalid = false;
  let invalidText = '';
  onMount(() => {
    // console.log(div);
    let draw = SVG().addTo(div).size(300, 300);
    let c1 = draw.circle(50).attr({ fill: '#f06' }).move(20, 20);
    let c2 = draw.circle(50).attr({ fill: '#f06' }).move(150, 150);
    let l1 = draw.line(45, 45, 175, 175);
    l1.stroke({ color: '#f06', width: 7, linecap: 'round' });
    let c3 = draw.circle(15).attr({ fill: '#f06' }).move(90, 40);
    //let c4 = draw.circle(15).attr({ fill: '#f06' }).move(170, 120);
    let c4 = draw.circle(15).attr({ fill: '#f06' }).move(120, 170);
    //let c5 = draw.circle(15).attr({ fill: '#f06' }).move(40, 80);
    let timeline = new Timeline();
    c3.timeline(timeline);
    c4.timeline(timeline);
    c3.animate(1000, 0, 'absolute').move(170, 120);
    c4.animate(1000, 0, 'absolute').move(40, 80);
  });
</script>

<Grid condensed={true} noGutter={true}>
  <Row>
    <Column md={3}>
      <SidePanel />
    </Column>
    <Column md={5}>
      <div bind:this={div} style="min-height:35rem" />
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
