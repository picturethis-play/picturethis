<script>
  import { Router, Route } from 'svelte-routing';
  import GamePage from './GamePage.svelte';
  import LandingPage from './LandingPage.svelte';
  export const url = '';
</script>

<Router {url}>
  <div class="flex flex-col justify-start items-start">
    <Route path="game/:gameId" let:params>
      <GamePage gameId={params.gameId}/>
    </Route>
    <Route path="/"><LandingPage/></Route>
  </div>
</Router>


