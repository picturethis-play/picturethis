<script>
  import { onMount } from 'svelte/internal';
  // import { wordDb } from '../assets/db';
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

  // function startGame() {
  //   console.log('gamestarted');
  //   let round = setInterval(() => {
  //     console.log($drawerIndex);
  //     if ($gameRound === totalRounds) {
  //       clearInterval(round);
  //       console.log('round over');
  //     }

  //     drawerIndex.set($drawerIndex + 1);
  //     if ($drawerIndex >= $players.length) {
  //       console.log('setting drawerindex');
  //       drawerIndex.set(0);
  //     }
  //     gameRound.set($gameRound + 1);
  //   }, roundTime * 1000);
  // }
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
