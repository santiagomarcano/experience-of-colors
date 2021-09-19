<script>
  import { fly, fade } from "svelte/transition";
  import { config } from "./store.js";
  let open = false;
  $: points = !open ? "9 18 15 12 9 6" : "15 18 9 12 15 6";
  let configState;
  function handleOpen() {
    open = !open;
  }
  function handleChange(e) {
    console.log(e.target.value);
    config.set({ ...configState, type: e.target.value });
  }
  config.subscribe((value) => {
    open = false;
    configState = { ...value };
  });
  console.log(configState);
</script>

<div class="label" on:click={handleOpen}>
  <svg
    stroke="currentColor"
    fill="none"
    stroke-width="2"
    viewBox="0 0 24 24"
    stroke-linecap="round"
    stroke-linejoin="round"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"><polyline {points} /></svg
  >
</div>
{#if open}
  <div class="menu" transition:fly={{ x: -1000 }} style="color: black">
    <select value={configState.type} on:change={handleChange}>
      <option value="LINES"> Lines </option>
      <option value="CIRCLES"> Circles </option>
      <option value="MIXED_LINES"> Mixed Lines </option>
    </select>
  </div>
  <div class="overlay" transition:fade on:click={handleOpen} />
{/if}

<style>
  .label {
    position: absolute;
    width: 1rem;
    height: 1rem;
    background: salmon;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    border-bottom-right-radius: 0.5rem;
    /* border-bottom-left-radius: 0.5rem; */
    cursor: pointer;
    z-index: 3;
    box-shadow: 2px 2px 12px 2px rgba(0, 0, 0, 0.2);
  }
  .label svg {
    stroke: white;
  }
  .menu {
    box-sizing: border-box;
    height: 100vh;
    width: 80%;
    background-color: white;
    color: black;
    position: fixed;
    left: 0;
    padding-top: 3rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    box-shadow: 2px 2px 12px 2px rgba(0, 0, 0, 0.2);
    z-index: 2;
  }
  select {
    width: 100%;
    background: white;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    box-shadow: 2px 2px 12px 2px rgba(0, 0, 0, 0.2);
  }
  @media (min-width: 768px) {
    .menu {
      width: 50%;
    }
  }
  .overlay {
    position: fixed;
    inset: 0;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.5);
  }
</style>
