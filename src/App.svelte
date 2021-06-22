<script>
  import NetworkEmulator from './content.svelte';
  import CreateGraph from './modal.svelte';
  import Sidebar from './sidebar.svelte';
  import { download } from '../lib/ToggleMenu/downloadFile';
  import { upload } from '../lib/ToggleMenu/uploadFile';
  import {
    Header,
    HeaderUtilities,
    HeaderGlobalAction,
    SkipToContent,
    SideNav,
    Content,
  } from 'carbon-components-svelte';
  import CloudUpload32 from 'carbon-icons-svelte/lib/CloudUpload32';
  import CloudDownload32 from 'carbon-icons-svelte/lib/CloudDownload32';
  import Share32 from 'carbon-icons-svelte/lib/Share32';
  import FetchUpload32 from 'carbon-icons-svelte/lib/FetchUpload32';
  import Help32 from 'carbon-icons-svelte/lib/Help32';
  import Save32 from 'carbon-icons-svelte/lib/Save32';

  let name = 'untitled';
  let isSideNavOpen = false;

  const uploadFile = async (e) => {
    e.preventDefault();
    try {
      const uploaded = await upload();
      const struct = JSON.parse(uploaded.json);
      name = uploaded.name.replace('.json', '');
      console.log(struct);
    } catch (error) {
      console.log(error);
    }
  };

  // let graphBase = null;
  let graphBase = {
    parsed_nodes: [
      { id: 'A', lable: 'A' },
      { id: 'B', lable: 'B' },
      { id: 'C', lable: 'C' },
      { id: 'D', lable: 'D' },
      // { id: 'E', lable: 'E' },
      // { id: 'F', lable: 'F' },
    ],
    parsed_edges: [
      { from: 'A', to: 'B' },
      { from: 'A', to: 'C' },
      { from: 'C', to: 'D' },
      { from: 'B', to: 'D' },
      // { from: 'B', to: 'E' },
      // { from: 'D', to: 'F' },
    ],
  };
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
    <HeaderGlobalAction
      aria-label="Upload"
      icon={CloudUpload32}
      on:click={(e) => {
        uploadFile(e);
      }}
    />
    <HeaderGlobalAction
      aria-label="Download"
      icon={CloudDownload32}
      on:click={(e) => {
        download(e, name);
      }}
    />
    <HeaderGlobalAction aria-label="Local Save" icon={Save32} />
    <HeaderGlobalAction aria-label="Local Load" icon={FetchUpload32} />
    <HeaderGlobalAction aria-label="Help" icon={Help32} />
    <HeaderGlobalAction aria-label="Share" icon={Share32} />
  </HeaderUtilities>
</Header>

<!-- fixed=true because then the overlay background condition will never become true -->
<SideNav fixed={true} style="z-index: 1;" bind:isOpen={isSideNavOpen}>
  <Sidebar bind:graphBase bind:name />
</SideNav>
<Content style="margin-top:2.5rem;padding: 0;margin-left: 0;">
  {#if graphBase}
    <NetworkEmulator bind:graphBase />
  {:else}
    <CreateGraph bind:graphBase bind:name />
  {/if}
</Content>
