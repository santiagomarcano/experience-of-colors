<script>
  import { createEventDispatcher } from "svelte";
  export let loading;
  let dispatch = createEventDispatcher();
  let input;
  function handleUpload() {
    input.click();
  }
  function handleInputChange(e) {
    dispatch("upload", e.target.files[0]);
  }
</script>

<div class="uploader">
  <input
    type="file"
    accept="image/*"
    capture="camera"
    bind:this={input}
    on:change={handleInputChange}
  />
  <button
    id="take"
    on:click={handleUpload}
    class:blinking={loading}
    disabled={loading}
  >
    Take photo
  </button>
</div>

<style>
  .blinking {
    animation: blink 0.3s alternate;
  }
  @keyframes blink {
    from {
      opacity: 0.3;
    }
    to {
      opacity: 0.7;
    }
  }
  .uploader {
    position: absolute;
    bottom: 5rem;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .uploader input {
    display: none;
  }
  .blinking {
    animation: blink 0.3s alternate infinite;
    cursor: not-allowed;
  }
  @keyframes blink {
    from {
      opacity: 0.3;
    }
    to {
      opacity: 0.7;
    }
  }
</style>
