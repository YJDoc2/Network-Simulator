<script>
  import { Grid, Row, Column } from 'carbon-components-svelte';
  import NodeInfo from './NodeInfo.svelte';
  import LogPanel from './LogPanel.svelte';
</script>

<Grid>
  <Row>
    <Column>
      <NodeInfo />
    </Column>
  </Row>
  <Row>
    <Column>
      <LogPanel />
    </Column>
  </Row>
</Grid>
