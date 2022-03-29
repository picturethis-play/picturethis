<script>
  import { onMount } from 'svelte';

  import { timer, waitingTime, roundTime } from '../stores/gameStates';
  import io, { Socket } from 'socket.io-client';
  const socket = io('http://localhost:3000');
  import wordDb from '../assets/db';
  const randomWords = wordDb;

  socket.on('start', () => {
    setInterval(() => {
      if ($timer === 0) {
        timer.set($roundTime + $waitingTime);
        // timer.set($roundTime);
        socket.emit('roundOver');
      }
      socket.emit('timer', $timer);
      timer.set($timer - 1);
    }, 1000);
  });

  // if ($timer === 10) {
  //   startRound();
  // }
  // socket.on('roundOver', startRound);

  function startRound() {
    socket.emit('start', randomWords[Math.floor(Math.random() * randomWords.length)].word);
    // socket.emit('drawer');
  }

  $: realTime = $roundTime;

  socket.on('timer', (timer) => {
    realTime = timer;
  });
  let setTime;
  onMount(() => {
    //Need to set this so the value of the progressbar percentage is correct for any timer
    setTime = $timer;
  });
</script>

<div class="w-full">
  <!-- <div class="h-5 w-full overflow-hidden rounded-md bg-gray-200">
    {#if $timer > 3}
      <div class="h-full bg-blue-600" style="width: {($timer * 100) / setTime}%" />
    {:else}
      <div class="h-full bg-red-600" style="width: {($timer * 100) / setTime}%" />{/if}
  </div> -->
  <div class="radial-progress text-primary" style="--value:{(realTime * 100) / setTime};">
    {(realTime * 100) / setTime}
  </div>
</div>
