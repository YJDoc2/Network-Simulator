<script>
  import NetworkEmulator from "./content.svelte";
  import CreateGraph from "./modal.svelte";
  import Sidebar from "./toggleMenu.svelte";
  import {
    Header,
    HeaderUtilities,
    HeaderGlobalAction,
    SkipToContent,
    SideNav,
    Content,
  } from "carbon-components-svelte";
  import CloudUpload32 from "carbon-icons-svelte/lib/CloudUpload32";
  import CloudDownload32 from "carbon-icons-svelte/lib/CloudDownload32";
  import Share32 from "carbon-icons-svelte/lib/Share32";
  import FetchUpload32 from "carbon-icons-svelte/lib/FetchUpload32";
  import Help32 from "carbon-icons-svelte/lib/Help32";
  import Save32 from "carbon-icons-svelte/lib/Save32";
  let isSideNavOpen = false;
</script>

<Header
  company=""
  platformName="Network Emulator"
  persistentHamburgerMenu={true}
  bind:isSideNavOpen
>
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

<!-- fixed=true because then the overlay background condition will never become true -->
<SideNav fixed={true} style="z-index: 1;" bind:isOpen={isSideNavOpen}>
  <Sidebar bind:open={isSideNavOpen} />
</SideNav>
<Content style="margin-top:4rem;padding: 0;margin-left: 0;">
  <CreateGraph />

  <NetworkEmulator />
</Content>
