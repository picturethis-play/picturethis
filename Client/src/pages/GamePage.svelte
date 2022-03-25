<script lang="ts">
  import Canvas from '../components/canvas.svelte';
  import Chat from '../components/Chat.svelte';
  import Players from '../components/Players.svelte';
  export const location = null;
</script>

<div class="w-full h-full flex flex-row justify-center items-center bg-gray-400 gap-4">
  <Players />
  <Canvas />
  <Chat />
</div>
