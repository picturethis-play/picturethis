<script>
  import { Router, Route } from 'svelte-routing';
  import GamePage from './GamePage.svelte';
  import LandingPage from './LandingPage.svelte';
  import WaitingRoom from './WaitingRoom.svelte';
  export const url = '';
</script>

<Router {url}>
  <div class="flex flex-col justify-start items-start w-full h-full bg-gray-400">
    <Route path="/game" let:params>
      <GamePage />
    </Route>
    <Route path="/"><WaitingRoom /></Route>
  </div>
</Router>
