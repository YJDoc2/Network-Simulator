<script>
  import NetworkEmulator from "./content.svelte";
  import CreateGraph from "./modal.svelte";
  import {
    Header,
    HeaderUtilities,
    HeaderGlobalAction,
    SkipToContent,
  } from "carbon-components-svelte";
  import CloudUpload32 from "carbon-icons-svelte/lib/CloudUpload32";
  import CloudDownload32 from "carbon-icons-svelte/lib/CloudDownload32";
  import Share32 from "carbon-icons-svelte/lib/Share32";
  import FetchUpload32 from "carbon-icons-svelte/lib/FetchUpload32";
  import Help32 from "carbon-icons-svelte/lib/Help32";
  import Save32 from "carbon-icons-svelte/lib/Save32";
</script>

<Header company="" platformName="Network Emulator">
  <div slot="skip-to-content">
    <SkipToContent />
  </div>
  <HeaderUtilities>
    <HeaderGlobalAction aria-label="Upload" icon={CloudUpload32} />
    <HeaderGlobalAction aria-label="Download" icon={CloudDownload32} />
    <HeaderGlobalAction aria-label="Local Save" icon={Save32} />
    <HeaderGlobalAction aria-label="Local Load" icon={FetchUpload32} />
    <HeaderGlobalAction aria-label="Help" icon={Help32} />
    <HeaderGlobalAction aria-label="Share" icon={Share32} />
  </HeaderUtilities>
</Header>

<main style="margin-top:5rem">
  <CreateGraph />
  <NetworkEmulator />
</main>
