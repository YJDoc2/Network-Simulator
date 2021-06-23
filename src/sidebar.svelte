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
  export let modalOpen;
  export let loadLocal = false;

  //initialising width of sidebar on mounting
  onMount(() => {
    document.getElementById("mySidenav").style.width = "320px";
  });

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
      graphBase = t;
      name = uploaded.name.replace(".json", "");

      saveToLocal(name);
      open = false;
    } catch (error) {
      console.log(error);
    }
  };
</script>

<div id="mySidenav" class="sidenav">
  <div id="title">
    <h2 style="font-weight: bold;">{name}</h2>
  </div>
  <hr />
  <div id="items">
    <Add32 />
    <a
      href="/"
      on:click={(e) => {
        e.preventDefault();
        name = "Untitled";
        Logger.clear();
        Packets.clear();
        open = false;
        modalOpen = true;
        // graphBase = null;
      }}>New Project</a
    >
  </div>
  <div id="items">
    <CloudUpload32 />
    <a href="/" on:click={(e) => uploadProject(e)}>Upload Project</a>
  </div>
  <div
    id="items"
    on:click={(e) => {
      download(e, name);
      open = false;
    }}
  >
    <CloudDownload32 />
    <a href="/">Download Project</a>
  </div>
  <div id="items">
    <Bookmark32 />
    <a
      href="/"
      on:click={(e) => {
        e.preventDefault();
        saveToLocal(name);
      }}>Save to Library</a
    >
  </div>
  <div id="items">
    <BookmarkFilled32 />
    <a
      href="/"
      on:click={(e) => {
        e.preventDefault();
        loadLocal = true;
        open = false;
      }}>Load project from Library</a
    >
  </div>
  <div id="items" style="display: flex;">
    <Search32 />
    <a href="/">Help/FAQs</a>
  </div>
  <div id="items">
    <LogoGithub32 />
    <a href="https://github.com/YJDoc2/Network-Simulator">Github</a>
  </div>
</div>

<style>
  #title {
    margin-left: 1em;
  }

  hr {
    border: 0;
    height: 0;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  }

  #items {
    margin-left: 1em;
    display: flex;
    padding-top: 1.3em;
    align-items: center;
  }
  .sidenav {
    height: 100%;
    width: 0;
    position: fixed;
    /* top: 4em; */
    left: 0;
    background-color: rgb(255, 255, 255);
    overflow-x: hidden;
    transition: 0.5s;
    padding-top: 60px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }

  .sidenav a {
    padding: 8px 8px 8px 32px;
    text-decoration: none;
    font-size: 20px;
    color: #818181;
    display: block;
    transition: 0.3s;
  }

  .sidenav #items:hover {
    color: #e6e6e6;
  }
  .sidenav a:hover {
    color: #e6e6e6;
  }

  @media screen and (max-height: 450px) {
    .sidenav {
      padding-top: 15px;
    }
    .sidenav a {
      font-size: 18px;
    }
  }
</style>
