<script>
  import Canvas from "./Canvas.svelte";
  import Menu from "./Menu.svelte";
</script>

<main>
  <Canvas />
  <Menu />
</main>

<style>
  * {
    font-family: "Courier New", Courier, monospace;
    color: white;
    box-sizing: border-box;
  }
  :global(body) {
    padding: 0;
  }
  :global(button) {
    appearance: none;
    border: 0;
    padding: 0.5rem;
    background-color: salmon;
    border-radius: 5px;
    cursor: pointer;
    margin: 0;
    color: white;
    box-shadow: 2px 2px 12px 2px rgba(0, 0, 0, 0.2);
  }
  :global(button.icon) {
    appearance: none;
    border: 0;
    padding: 0.5rem;
    background-color: salmon;
    border-radius: 50%;
    cursor: pointer;
    height: 2rem;
    width: 2rem;
    color: white;
  }
  :global(button.icon svg) {
    stroke: white;
  }
</style>
