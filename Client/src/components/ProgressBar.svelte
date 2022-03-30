<script>
  import { onMount } from 'svelte';
  import { timer, waitingTime, roundTime, gameRound, numberOfRounds } from '../stores/gameStates';
  import { randomUser } from '../stores/chat-stores';
  import io from 'socket.io-client';
  const socket = io('http://localhost:3000');
  import wordDb from '../assets/db';
  const randomWords = wordDb;
  let socketId = sessionStorage.getItem('socketid');
  let drawer = sessionStorage.getItem('drawer');
  let time;

  socket.on('start', () => {
    time = setInterval(() => {
      if ($timer === 0) {
        gameRound.set($gameRound + 1);
        if ($gameRound === $numberOfRounds) {
          socket.emit('clear');
          console.log('gaudi is my daddy');
          clearInterval(time);
        } else {
          timer.set($roundTime + $waitingTime);
          if (socketId === JSON.parse(drawer).id) {
            socket.emit(
              'roundOver',
              randomWords[Math.floor(Math.random() * randomWords.length)].word,
            );
            socket.emit('drawer');
          }
          socket.emit('clear');
        }
      }
      socket.emit('timer', $timer);
      timer.set($timer - 1);
    }, 1000);
  });

  socket.on('allGuessed', () => {
    timer.set($roundTime + $waitingTime);
    if (socketId === JSON.parse(drawer).id) {
      socket.emit('drawer');
    }
    socket.emit('clear');
  });

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
  <div
    class="radial-progress text-primary"
    style="--value:{(realTime * 100) / setTime}; --size:4rem;"
  >
    {(realTime * 100) / setTime / 2}
  </div>
</div>
