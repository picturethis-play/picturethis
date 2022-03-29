<script lang="ts">
  import Canvas from '../components/Canvas.svelte';
  import Chat from '../components/Chat.svelte';
  import Players from '../components/Players.svelte';
  import GameState from '../components/GameState.svelte';
  import StartModal from '../components/StartModal.svelte';
  import RoundEnd from '../components/RoundEnd.svelte';
  export const location = null;
  import { timer, waitingTime, roundTime } from '../stores/gameStates';
  import io from 'socket.io-client';
  const socket = io('http://localhost:3000');
  let displayModal = true;
  socket.on('start', () => {
    displayModal = !displayModal;
  });
  let roundOver = false;
  socket.on('roundOver', () => {
    roundOver = !roundOver;
  });
</script>

<!-- <div class="flex flex-col">
  <GameState />
</div> -->
<div
  class="flex flex-row sm:flex-col sm:gap-0 sm:mt-0 sm:mb-4 sm:w-full md:flex-col md:gap-0 md:mt-0 md:w-full justify-center items-center gap-4"
>
  {#if $timer > $roundTime}
    <RoundEnd />
  {/if}
  {#if displayModal}
    <StartModal />
  {/if}
  <Players />
  <Canvas />
  <Chat />
</div>
