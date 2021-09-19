<script>
  import { config } from "./store.js";
  import Uploader from "./Uploader.svelte";
  import getColors from "./helpers/getColors";
  import draw from "./helpers/draw";

  let file;
  let canvas;
  let loading = false;
  let objectURL;
  let href;
  let configState;
  config.subscribe((value) => {
    console.log("cnfgi state");
    configState = { ...value };
  });
  $: {
    if (file) {
      objectURL = URL.createObjectURL(file);
      // Not used
      // imageSource = objectURL;
      console.log("empieza?");
      loading = true;
      getColors({ objectURL, canvas })
        .then((colors) => {
          return draw({ canvas, colors, config: configState });
        })
        .then((base64) => {
          loading = false;
          href = base64.replace("image/png", "image/octet-stream");
          console.log("Termina.");
        });
    }
  }
  function handleUpload({ detail }) {
    file = detail;
  }
</script>

<canvas bind:this={canvas} />
<Uploader slot="upload" on:upload={handleUpload} {loading} />
{#if href && !loading}
  <a download="canvas.png" {href}>
    <button class="download icon"
      ><svg
        stroke="currentColor"
        fill="none"
        stroke-width="2"
        viewBox="0 0 24 24"
        stroke-linecap="round"
        stroke-linejoin="round"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
        ><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline
          points="7 10 12 15 17 10"
        /><line x1="12" y1="15" x2="12" y2="3" /></svg
      ></button
    >
  </a>
{/if}

<style>
  canvas {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: -1;
    width: 100vw;
    height: 100vh;
    object-fit: cover;
  }
  .download {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
  }
</style>
