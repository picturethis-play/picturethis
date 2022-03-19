<script lang="ts">
  // import Canvas from './components/canvas.svelte';
  // import Header from './components/Header.svelte';
  // import Chat from './components/Chat.svelte';
  import GamePage from './routes/GamePage.svelte';
  import LandingPage from './routes/LandingPage.svelte';
</script>

<div class="app">
  <LandingPage />
  <GamePage />
</div>

<style>
  .app {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
</style>
