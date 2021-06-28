<script>
  import Add32 from "carbon-icons-svelte/lib/Add32";
  import CloudUpload32 from "carbon-icons-svelte/lib/CloudUpload32";
  import CloudDownload32 from "carbon-icons-svelte/lib/CloudDownload32";
  import Bookmark32 from "carbon-icons-svelte/lib/Bookmark32";
  import BookmarkFilled32 from "carbon-icons-svelte/lib/BookmarkFilled32";
  import Search32 from "carbon-icons-svelte/lib/Search32";
  import LogoGithub32 from "carbon-icons-svelte/lib/LogoGithub32";
  import { Packets } from "../lib/packets";
  import { Logger } from "../lib/logger";
  import { onMount } from "svelte";
  import { download } from "../lib/ToggleMenu/downloadFile";
  import { upload } from "../lib/ToggleMenu/uploadFile";
  import { fromSaved } from "../lib/init";
  import { saveToLocal } from "../lib/ToggleMenu/local";

  export let name = "untitled";
  export let graphBase = null;
  export let open;
  export let loadLocal = false;

  //initialising width of sidebar on mounting
  onMount(() => {
    document.getElementById("mySidenav").style.width = "320px";
  });

  /**
   * Upload function for loading .json file of the simulation.
   *
   */
  const uploadProject = async (e) => {
    e.preventDefault();
    try {
      const uploaded = await upload();
      let json = JSON.parse(uploaded.json);
      fromSaved(json);
      let t = { parsed_nodes: [], parsed_edges: json.edges };
      for (let k in json.nodes) {
        t.parsed_nodes.push({ id: k, label: k });
      }
      name = uploaded.name.replace(".json", "");
      graphBase = t;
      saveToLocal(name);
      open = false;
    } catch (error) {
      console.log(error);
    }
  };
</script>

<div id="mySidenav" class="sidenav">
  <img src="/favicon.png" alt="logo" height="100" width="100" id="sidebar-img"/>
  <div id="title">
    <h2 style="font-weight: bold;">{name}</h2>
  </div>
  <hr />
  <div
    class="items"
    on:click={(e) => {
      e.preventDefault();
      name = "Untitled";
      Logger.clear();
      Packets.clear();
      open = false;
      graphBase = null;
    }}
  >
    <Add32 />
    <span>New Project</span>
  </div>
  <div class="items" on:click={(e) => uploadProject(e)}>
    <CloudUpload32 />
    <span>Upload Project</span>
  </div>
  <div
    class="items"
    on:click={(e) => {
      download(e, name);
      open = false;
    }}
  >
    <CloudDownload32 />
    <span>Download Project</span>
  </div>
  <div
    class="items"
    on:click={(e) => {
      e.preventDefault();
      saveToLocal(name);
    }}
  >
    <Bookmark32 />
    <span>Save to Library</span>
  </div>
  <div
    class="items"
    on:click={(e) => {
      e.preventDefault();
      loadLocal = true;
      open = false;
    }}
  >
    <BookmarkFilled32 />
    <span>Load project from Library</span>
  </div>
  <div class="items">
    <Search32 />
    <span>Help/FAQs</span>
  </div>
  <div
    class="items"
    onclick="window.open('https://github.com/YJDoc2/Network-Simulator','mywindow');"
  >
    <LogoGithub32 />
    <a href="https://github.com/YJDoc2/Network-Simulator">Github</a>
  </div>
</div>

<style>
  #title {
    margin-left: 1em;
    margin-top: 5vh;
    font-size: 2rem;
  }

  hr {
    border: 0;
    height: 0;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  }

  .items {
    padding-left: 1em;
    padding-bottom: 5px;
    display: flex;
    padding-top: 1.3em;
    align-items: center;
    cursor: pointer;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
  .sidenav {
    height: 100%;
    width: 0;
    position: fixed;
    left: 0;
    background-color: rgb(255, 255, 255);
    overflow-x: hidden;
    transition: 0.5s;
    padding-top: 40px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }

  #sidebar-img {
    margin-left: 20px;
  }

  .sidenav a,
  .sidenav span {
    padding: 8px 8px 8px 12px;
    text-decoration: none;
    font-size: 1rem;
    color: #818181;
    display: block;
    transition: 0.3s;
  }

  .sidenav .items:hover *,
  .sidenav .items:hover {
    color: #ff8f00 !important;
  }

  @media screen and (max-height: 450px) {
    .sidenav {
      padding-top: 15px;
    }
    .sidenav a,
    .sidenav span {
      font-size: 18px;
    }
  }
</style>
