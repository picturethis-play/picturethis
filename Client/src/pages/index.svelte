<script>
  import { Router, Route } from 'svelte-routing';
  import GamePage from './GamePage.svelte';
  import LandingPage from './LandingPage.svelte';
  import WaitingRoom from './WaitingRoom.svelte';
  export const url = '';

  const gameId = Math.floor(Math.random() * 1000000000);
</script>

<Router {url}>
  <div class="w-full h-full">
    <Route path="/{gameId}/game" let:params>
      <GamePage gameId={gameId}/>
    </Route>
    <Route path="/{gameId}"><WaitingRoom gameId={gameId}/></Route>
    <Route path="/"><LandingPage gameId={gameId}/></Route>
  </div>
</Router>
