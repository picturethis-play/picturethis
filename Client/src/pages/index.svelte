<script lang="ts">
  import { Router, Route } from 'svelte-routing';
  import GamePage from './GamePage.svelte';
  import LandingPage from './LandingPage.svelte';
  import socket from '../socket';
  export const url = '';

  const gameSocket = socket('cursor:lobby');

</script>

<Router {url}>
  <div class="app">
    <Route path="game"><GamePage gameSocket={gameSocket}/></Route>
    <Route path="/"><LandingPage /></Route>
  </div>
</Router>

<style>
  .app {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
</style>
