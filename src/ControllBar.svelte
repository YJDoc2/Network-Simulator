<script>
  import { Button } from 'carbon-components-svelte';
  import Play32 from 'carbon-icons-svelte/lib/Play32';
  import ArrowRight32 from 'carbon-icons-svelte/lib/ArrowRight32';
  import Stop32 from 'carbon-icons-svelte/lib/Stop32';

  export let animationPlaying = false;

  export let stopped = true;

  export let play = () => {};
  export let step = () => {};
</script>

<div id="container">
  <Button
    disabled={animationPlaying}
    kind="ghost"
    iconDescription="Start"
    icon={Play32}
    on:click={() => {
      animationPlaying = true;
      stopped = false;
      play();
    }}
  />

  <Button
    disabled={animationPlaying}
    kind="ghost"
    iconDescription="Step"
    icon={ArrowRight32}
    on:click={() => {
      animationPlaying = true;
      stopped = false;
      step();
    }}
  />

  <Button
    kind="ghost"
    iconDescription="Stop"
    icon={Stop32}
    on:click={() => {
      stopped = true;
    }}
  />
</div>

<style>
  #container {
    border: 1px solid;
    position: absolute;
    right: 7vw;
    top: 7vh;
  }
</style>
