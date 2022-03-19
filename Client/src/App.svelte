<script lang="ts">
  import Canvas from './components/canvas.svelte';
  import Header from './components/Header.svelte';
</script>

<div class="app">
  <Header />
  <Canvas />
</div>

<style>
  .app {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
</style>
