<script>
  import { onMount } from 'svelte/internal';
  import { wordDb } from '../assets/db';
  import {
    timer,
    drawing,
    gameStarted,
    drawerIndex,
    players,
    gameRound,
    waitingTime,
  } from '../stores/gameStates';
  import Word from './Chat/Word.svelte';

  let roundTime = $timer + $waitingTime;

  console.log(roundTime);


  let rounds = 3;

  let totalRounds = rounds * $players.length;

  function startGame() {
    console.log('gamestarted');
    gameStarted.set(true);
    let round = setInterval(() => {
      console.log($drawerIndex);
      if ($gameRound === totalRounds) {
        clearInterval(round);
        console.log('round over');
        gameStarted.set(false);
      }

      drawerIndex.set($drawerIndex + 1);
      if ($drawerIndex >= $players.length) {
        console.log('setting drawerindex');
        drawerIndex.set(0);
      }
      drawing.set(!$drawing);
      gameRound.set($gameRound + 1);
    }, roundTime * 1000);
  }

  onMount(() => {
    console.log('timer is', $timer);
    startGame();
    console.log('started game Gauteeee');
  });
</script>

<div class="mx-4 border-2 border-solid border-red-800 p-2">
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
