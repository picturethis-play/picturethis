<script lang="ts">
  import Canvas from '../components/Canvas.svelte';
  import Chat from '../components/Chat.svelte';
  import Players from '../components/Players.svelte'; 
  import StartModal from '../components/StartModal.svelte';
  import RoundEnd from '../components/RoundEnd.svelte';
  import { getContext } from 'svelte';
  export const location = null;
  import { timer, roundTime, gameRound, numberOfRounds } from '../stores/gameStates';
  import GameEndModal from '../components/GameEndModal.svelte';

  const { Socket } = getContext('connect');
  const socket = Socket();

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
  class="flex flex-row justify-center 
  items-center h-full gap-4 m-4 sm:flex-col sm:justify-around" 
 >
 
  {#if $gameRound >= $numberOfRounds}
    
    <GameEndModal />
  {:else}
    {#if $timer > $roundTime }
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
