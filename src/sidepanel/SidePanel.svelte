<script>
  import { Grid, Row, Column } from 'carbon-components-svelte';
  import NodeInfo from './NodeInfo.svelte';
  import LogPanel from './LogPanel.svelte';

  export let playing;
</script>

<Grid>
  <Row>
    <Column>
      <NodeInfo {playing} />
    </Column>
  </Row>
  <Row>
    <Column>
      <LogPanel />
    </Column>
  </Row>
</Grid>
