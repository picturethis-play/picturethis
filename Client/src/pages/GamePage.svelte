<script lang="ts">
  import Canvas from '../components/Canvas.svelte';
  import Chat from '../components/Chat.svelte';
  import Players from '../components/Players.svelte';
  import StartModal from '../components/StartModal.svelte';
  import RoundEnd from '../components/RoundEnd.svelte';
  export const location = null;
  import { timer, roundTime, gameRound, numberOfRounds } from '../stores/gameStates';
  import io from 'socket.io-client';
  import GameEndModal from '../components/GameEndModal.svelte';

  const socket = io('http://localhost:3000');

  let displayModal = true;
  socket.on('start', () => {
    displayModal = !displayModal;
  });

  let roundOver = true;
  socket.on('roundOver', () => {
    roundOver = false;
  });

  // let overModal = false;

  // socket.on('gameOver', () => {
  //   overModal = !overModal;
  // });
</script>

<div
  class="flex flex-row justify-center items-center h-full sm:items-center md:items-center sm:justify-center md:justify-center sm:flex-col sm:gap-0 sm:mt-0 sm:mb-4 sm:w-full md:flex-col md:gap-0 md:w-full gap-4"
>
  {#if $gameRound === $numberOfRounds}
    <!-- {#if overModal} -->
    <GameEndModal />
  {:else}
    {#if $timer > $roundTime}
      <RoundEnd />
    {/if}
    {#if displayModal}
      {#if roundOver}
        <StartModal />
      {/if}
    {/if}
    <Players />
    <Canvas />
    <Chat />
  {/if}
</div>
