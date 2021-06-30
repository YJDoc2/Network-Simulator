<script>
  import NetworkEmulator from "./content.svelte";
  import CreateGraph from "./modal.svelte";
  import Sidebar from "./sidebar.svelte";
  import LoadLocalModal from "./LoadLocalModal.svelte";
  import { download } from "../lib/ToggleMenu/downloadFile";
  import { upload } from "../lib/ToggleMenu/uploadFile";
  import { fromSaved } from "../lib/init";
  import { saveToLocal } from "../lib/ToggleMenu/local";
  import { LOCAL_SAVE_KEY } from "../lib/constants";
  import {
    Header,
    HeaderUtilities,
    HeaderGlobalAction,
    SkipToContent,
    SideNav,
    Content,
  } from "carbon-components-svelte";
  import CloudUpload32 from "carbon-icons-svelte/lib/CloudUpload32";
  import CloudUpload16 from "carbon-icons-svelte/lib/CloudUpload16";
  import CloudDownload32 from "carbon-icons-svelte/lib/CloudDownload32";
  import FetchUpload32 from "carbon-icons-svelte/lib/FetchUpload32";
  import FetchUpload16 from "carbon-icons-svelte/lib/FetchUpload16";
  import Help32 from "carbon-icons-svelte/lib/Help32";
  import Help16 from "carbon-icons-svelte/lib/Help16";
  import Save32 from "carbon-icons-svelte/lib/Save32";

  let name = "Untitled";
  let isSideNavOpen = false;
  let loadLocalOpen = false;
  let graphBase = null;
  const loadProject = (n) => {
    let projects = JSON.parse(localStorage.getItem(LOCAL_SAVE_KEY)) || {};
    if (!projects[n]) {
      throw "Internal Error : tried to open non-existing project";
    }
    fromSaved(projects[n]);

    let t = { parsed_nodes: [], parsed_edges: projects[n].edges };
    for (let k in projects[n].nodes) {
      t.parsed_nodes.push({ id: k, label: k });
    }
    graphBase = t;
    name = n;
    loadLocalOpen = false;
  };

  const uploadFile = async (e) => {
    e.preventDefault();
    try {
      const uploaded = await upload();
      let json = JSON.parse(uploaded.json);
      fromSaved(json);
      let t = { parsed_nodes: [], parsed_edges: json.edges };
      for (let k in json.nodes) {
        t.parsed_nodes.push({ id: k, label: k });
      }
      graphBase = t;
      name = uploaded.name.replace(".json", "");
      saveToLocal(name);
      open = false;
    } catch (error) {
      console.log(error);
    }
  };

  //retrieve the current project on refresh
  let lastSaved = localStorage.getItem("lastSaved");
  if (lastSaved !== null) {
    loadProject(lastSaved);
  }
  //Use Ctrl+S to Save
  document.addEventListener("keydown", function (event) {
    if (event.code == "KeyS" && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      saveToLocal(name);
    }
  });
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
      title={"Upload"}
      icon={CloudUpload32}
      on:click={(e) => {
        uploadFile(e);
      }}
    />
    <HeaderGlobalAction
      aria-label="Download"
      title={"Download"}
      icon={CloudDownload32}
      on:click={(e) => {
        download(e, name);
      }}
    />
    <HeaderGlobalAction
      aria-label="Local Save"
      title={"Local Save"}
      icon={Save32}
      on:click={() => {
        saveToLocal(name);
      }}
    />
    <HeaderGlobalAction
      aria-label="Load Local"
      title={"Load Local"}
      icon={FetchUpload32}
      on:click={() => {
        loadLocalOpen = true;
      }}
    />
    <HeaderGlobalAction aria-label="Help" title={"Help"} icon={Help32} />
  </HeaderUtilities>
</Header>


<!-- fixed=true because then the overlay background condition will never become true -->
<SideNav fixed={true} style="z-index: 1;" bind:isOpen={isSideNavOpen}>
  <Sidebar
    bind:graphBase
    bind:name
    bind:loadLocal={loadLocalOpen}
    bind:open={isSideNavOpen}
  />

<Content style="margin-top:2.5rem;padding: 0;margin-left: 0;">
  {#if graphBase}
    <NetworkEmulator bind:name bind:graphBase />
  {:else}
    <div style="margin-top:20vh; text-align: center;">
      <h1 style="font-size: 7rem;">Network Emulator</h1>
      <h3>A simple Network Simulation tool</h3>
      <p style="margin-top: 1.5rem; font-size: 1.5rem;">
        Click <Help16 /> in navbar to get more information.<br />
        Click <CloudUpload16 /> to upload a config file for simulation. <br />
        Click <FetchUpload16 /> to load a saved project from local storage.<br
        />
      </p>
    </div>
    <CreateGraph bind:graphBase bind:name />
  {/if}
  {#if loadLocalOpen}
    <LoadLocalModal bind:open={loadLocalOpen} {loadProject} />
  {/if}

</Content>
<div id="footer">
  Developed by <span> &nbsp; &bullet; &nbsp;</span>
  <a href="https://github.com/YJDoc2" class="footer-text">Yashodhan Joshi</a>
  <span> &nbsp; &bullet; &nbsp;</span>
  <a href="https://github.com/YatharthVyas" class="footer-text">Yatharth Vyas</a
  >
  <span> &nbsp; &bullet; &nbsp;</span>
  <a href="https://github.com/Vatsalsoni13" class="footer-text">Vatsal Soni</a>
  <span> &nbsp; &bullet; &nbsp;</span>
  <a href="https://github.com/Tejas988" class="footer-text">Tejas Ghone</a>
</div>

<style>
  #footer {
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 0.5rem;
    width: 100%;
    background-color: #000000;
    color: #ffffff;
    font-size: 1.2rem;
    text-align: center;
  }
  .footer-text {
    color: #ffffff;
  }
</style>
