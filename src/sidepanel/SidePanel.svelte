<script>
  import { Grid, Row, Column } from 'carbon-components-svelte';
  import NodeInfo from './NodeInfo.svelte';
  import LogPanel from './LogPanel.svelte';
</script>

<Grid>
  <Row style="height:20rem; overflow-y: scroll;">
    <Column>
      <NodeInfo />
    </Column>
  </Row>
  <Column>
    <LogPanel />
  </Column>
  <Row />
</Grid>
