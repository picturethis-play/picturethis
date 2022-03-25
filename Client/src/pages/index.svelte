<script>
  import { Router, Route } from 'svelte-routing';
  import GamePage from './GamePage.svelte';
  import LandingPage from './LandingPage.svelte';
  import WaitingRoom from './WaitingRoom.svelte';
  export const url = '';
</script>

<Router {url}>
  <div>
    <Route path="/game" let:params>
      <GamePage />
    </Route>
    <Route path="/"><LandingPage /></Route>
  </div>
</Router>
