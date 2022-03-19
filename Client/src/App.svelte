<script lang="ts">
  import Canvas from './components/canvas.svelte';
  import Header from './components/Header.svelte';
  import Chat from './components/Chat.svelte';
</script>

<div class="app">
  <Header />
  <Canvas />
  <Chat />
</div>

<style>
  .app {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
</style>
