<script>
  import { Tabs, Tab, TabContent } from 'carbon-components-svelte';
  import { TextArea } from 'carbon-components-svelte';
  import { Accordion, AccordionItem } from 'carbon-components-svelte';
  import { Tile } from 'carbon-components-svelte';
</script>

<Tabs>
  <Tab label="Data" />
  <Tab label="Queue" />

  <div slot="content">
    <TabContent>
      <div style="overflow-y:scroll">
        <Accordion>
          {#each Array(5) as _, i}
            <AccordionItem>
              <div slot="title">
                <h5>Node {i + 1}</h5>
              </div>
              <p>
                <TextArea
                  rows={5}
                  labelText="Memory"
                  placeholder="Memory Object"
                />
                <TextArea
                  rows={5}
                  labelText="Function"
                  placeholder="Node Function"
                />
              </p>
            </AccordionItem>
          {/each}
        </Accordion>
      </div>
    </TabContent>
    <TabContent
      >{#each Array(5) as _, i}
        <Tile
          >Node {i + 1} &nbsp;
          {#each Array(i + 2) as _, i}
            &nbsp;&#8857; &nbsp;
          {/each}
        </Tile>
      {/each}</TabContent
    >
  </div>
</Tabs>
