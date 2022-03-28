<script lang="ts">
  import Canvas from '../components/Canvas.svelte';
  import Chat from '../components/Chat.svelte';
  import Players from '../components/Players.svelte';
  export const location = null;
</script>

<div class="flex flex-row md:flex-col md:gap-0 md:mt-0 md:mb-4 md:w-full justify-center items-center gap-4">
  <Players />
  <Canvas />
  <Chat />
</div>
