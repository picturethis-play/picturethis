<script lang="ts">
  import Canvas from '../components/Canvas.svelte';
  import Chat from '../components/Chat.svelte';
  import Players from '../components/Players.svelte';
  import GameState from '../components/GameState.svelte';
  export const location = null;
</script>

<div class="flex flex-col">
  <GameState />
</div>
<div
  class="flex flex-row sm:flex-col sm:gap-0 sm:mt-0 sm:mb-4 sm:w-full md:flex-col md:gap-0 md:mt-0 md:w-full justify-center items-center gap-4"
>
  <Players />
  <Canvas />
  <Chat />
</div>
