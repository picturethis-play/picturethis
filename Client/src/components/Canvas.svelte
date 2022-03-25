<script>
  import { onMount } from 'svelte';
  import { secretWord, counter, randomUser } from '../stores/chat-stores';
  import wordDb from '../assets/db';
  import Button from './Button.svelte';
  let penColor;
  let painting;
  let canvas;
  let ctx;
  let lineWidth = 5;
  let playersArr = [];
  import io from 'socket.io-client';

  const socket = io('http://localhost:3000');

  $: time = 60;

  socket.on('draw', ({ mousePosition, lineWidth, penColor }) => {
    console.log('hi');
    draw(mousePosition, lineWidth, penColor, false);
  });

  socket.on('clear', (e) => {
    clear(false);
  });

  socket.on('finishedPosition', () => {
    finishedPosition(false);
  });
  socket.on('startPosition', () => {
    startPosition(false);
  });

  // const randomWords = ['table', 'chair', 'hat', 'bag', 'keys', 'laptop', 'door'];
  const randomWords = wordDb;
  onMount(() => {
    canvas = document.getElementById('myCanvas');
    ctx = canvas.getContext('2d');
    canvas.height = 500;
    canvas.width = 800;

    // canvas.addEventListener('mousedown', startPosition);
    // canvas.addEventListener('mouseup', finishedPosition);
    // canvas.addEventListener('mousemove', handleDraw);
    canvas.addEventListener('touchstart', startPosition);
    canvas.addEventListener('touchend', finishedPosition);
    canvas.addEventListener('touchmove', handleDraw);
    getRandomUser();
    startGame();
  });
  function startGame() {
    socket.emit('start', randomWords[Math.floor(Math.random() * randomWords.length)].word);
  }

  $: randomuser = { id: 2 };

  socket.on('randomuser', (user) => {
    console.log('↪️', user);
    randomuser = user;
    randomUser.set(user);
  });

  // socket.on('new', (d) => {
  //   socket.emit('getUsers');
  //   console.log('socket', d);
  //   // playerId = d;
  //   // setUserClientId(d);
  // });

  socket.on('start', (word) => {
    console.log(word);
    secretWord.set(word);
    // const gameTimer = setInterval(() => {
    //   time = time - 1;
    //   // counter.set(time);
    //   if (time === 0) {
    //     socket.emit('clear');
    //     time = 60;
    //     clearInterval(gameTimer);
    //     return;
    //   }
    // }, 1000);
  });

  function startPosition(start) {
    painting = true;
    console.log('startposition');
    if (start) socket.emit('startPosition');
  }

  function finishedPosition(finished) {
    painting = false;
    ctx.beginPath();
    console.log('finishedposition');
    if (finished) socket.emit('finishedPosition');
  }

  function getMousePosition(e) {
    var mouseX = ((e.offsetX * canvas.width) / canvas.clientWidth) | 0;
    var mouseY = ((e.offsetY * canvas.height) / canvas.clientHeight) | 0;
    return { x: mouseX, y: mouseY };
  }

  function handleDraw(e) {
    if (!painting) return;
    const mousePosition = getMousePosition(e);
    console.log('drawing', e);
    draw(mousePosition, lineWidth, penColor, true);
  }

  function draw(mousePosition, lineWidth, penColor, broadcast) {
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = penColor;
    ctx.lineCap = 'round';
    ctx.lineTo(mousePosition.x, mousePosition.y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(mousePosition.x, mousePosition.y);
    if (broadcast) socket.emit('draw', { mousePosition, lineWidth, penColor });
  }

  function clear(broadcast) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.height = 500;
    canvas.width = 800;
    if (broadcast) socket.emit('clear');
  }

  let m = { x: 0, y: 0 };

  function handleMousemove(event) {
    m.x = event.clientX;
    m.y = event.clientY;
  }

  function getRandomUser() {
    socket.emit('randomuser');
  }
  // function getUsers() {
  //   socket.emit('getUsers');
  // }

  // let joinedUsers = [];

  // socket.on('joined users', (users) => {
  //   console.log(users);
  //   joinedUsers = users;
  // });
  // console.log('randomuser', randomuser);
  let data = sessionStorage.getItem('socketid');

  let space = $secretWord.indexOf(' ');
  let joinedWord = Array($secretWord.length + 1).join('_ ');
  let actualWord = joinedWord.charAt(space, ' ');
</script>

<div class="flex flex-col items-center justify-center">
  <!-- {#await randomuser then randomuser}
    <p>{randomuser.name} is drawing</p> -->
  <!-- <p>played id {data}</p> -->
  <button on:click={getRandomUser}>New Drawer</button>
  <button on:click={startGame}>New Word</button>
  <!-- <button on:click={getUsers}>Get Users</button> -->
  <!-- {/await} -->
  <div class="h-16 flex">
    {#if data == randomuser.id}
      <p class="text-5xl">{$secretWord}</p>
    {:else}
      <p class="text-5xl">
        {Array($secretWord.length + 1).join('_ ')}
      </p>
    {/if}
  </div>
  <canvas
    class="bg-white border-2 rounded-md border-solid border-black block cursor-crosshair h-canvas w-canvas"
    id="myCanvas"
    on:mousemove={data == randomuser.id ? handleDraw : null}
    on:mousedown={startPosition}
    on:mouseup={finishedPosition}
    on:mouseleave={finishedPosition}
  />

  <div class="flex gap-4 items-center h-12">
    <p>{time}</p>
    {#if data == randomuser.id}
      <button on:click={clear}> Clear </button>
      {#if time === 60}
        <button on:click={startGame}> Start </button>
      {/if}
      <input class="h-8" type="color" bind:value={penColor} />
      <input type="range" min="1" max="10" bind:value={lineWidth} />
    {/if}
  </div>
</div>

<style>
</style>
