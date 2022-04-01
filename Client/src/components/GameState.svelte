<script>
  import {
    timer,
    drawerIndex,
    players,
    gameRound,
    waitingTime,
    numberOfRounds,
  } from '../stores/gameStates';
  // import Word from './Chat/Word.svelte';

  let roundTime = $timer + $waitingTime;

  console.log(roundTime);

  let totalRounds = $numberOfRounds * $players.length;

</script>

<div class="mx-4 border-2 border-solid border-red-800 p-2 text-primary">
  {#if $gameRound > totalRounds}
    Game Over!
  {:else}
    Round: {$gameRound}{/if}
  <br />
  Drawer: {$players[$drawerIndex]}
  <br />
  Secret Word: lets see!
  <br />
  Total Rounds: {totalRounds}
</div>
