<script>
  import { Router, Route } from 'svelte-routing';
  import GamePage from './GamePage.svelte';
  import WaitingRoom from './WaitingRoom.svelte';
  export const url = '';
</script>

<Router {url}>
  <div class="w-full h-full">
    <Route path="/game" let:params>
      <GamePage />
    </Route>
    <Route path="/"><WaitingRoom/></Route>
  </div>
</Router>
