<script>
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import { randomUser, secretWords } from '../stores/chat-stores';
  let penColor;
  let painting;
  let canvas;
  let ctx;
  let lineWidth = 5;
  import io from 'socket.io-client';
  import ProgressBar from './ProgressBar.svelte';
  import { lengthOfSecretWord } from '../stores/gameStates';
  // import { navigate } from 'svelte-routing';

  const socket = io('http://localhost:3000');

  $: time = 60;

  socket.on('draw', ({ mousePosition, lineWidth, penColor }) => {
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

  onMount(() => {
    canvas = document.getElementById('myCanvas');
    ctx = canvas.getContext('2d');
    canvas.height = 500;
    canvas.width = 800;
    canvas.addEventListener('touchstart', startPosition);
    canvas.addEventListener('touchend', finishedPosition);
    canvas.addEventListener('touchmove', handleDraw);
  });

  // $: ssDrawer = {};
  $: drawer = JSON.parse(sessionStorage.getItem('drawer'));
  socket.on('drawer', (user) => {
    console.log('↪️', user);
    randomUser.set(user);
    sessionStorage.setItem('drawer', JSON.stringify(user));
    drawer = JSON.parse(sessionStorage.getItem('drawer'));
    console.log(drawer);
    // ssDrawer = user;
    // console.log('ppo', ssDrawer);
  });

  // socket.on('navigate', () => {
  //   console.log('jhidhishdsdsdf');
  //   ssDrawer = sessionStorage.getItem('drawer');
  // });

  // socket.on('navigate', (drawer) => {
  //   navigate(`/game`, { replace: true });
  //   sessionStorage.setItem('drawer', JSON.stringify(drawer));
  //   ssDrawer = drawer;
  // });

  socket.on('start', (word) => {
    console.log(word, 'STARTSTARTSTARTSTARTSTART');
    let hangmanString = word.replace(/[a-zA-Z]/g, '_');
    secretWords.set([...$secretWords, word]);
    lengthOfSecretWord.set(hangmanString);
  });

  socket.on('roundOver', (word) => {
    console.log(word, 'ROUNDOVEROROUNDOVERROUNDOVER');
    let hangmanString = word.replace(/[a-zA-Z]/g, '_');
    secretWords.set([...$secretWords, word]);
    lengthOfSecretWord.set(hangmanString);
  });

  function startPosition(start) {
    painting = true;
    if (start) socket.emit('startPosition');
  }

  function finishedPosition(finished) {
    painting = false;
    ctx.beginPath();
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

  // function getRandomUser() {
  //   socket.emit('drawer');
  // }

  let socketId = sessionStorage.getItem('socketid');
</script>

<div class="xl:relative lg:relative ">
  <div
    class="flex items-center font-logo text-5xl xl:absolute lg:absolute md:relative sm:relative xl:-mt-32 lg:-mt-36 xl:ml-picturethis lg:ml-picturethistwo"
  >
    {#each 'picture' as char, i}
      <p
        class="animate-bouncer text-primary"
        in:fade={{ delay: 1000 + i * 150, duration: 1800 }}
        out:fly={{ y: -20, duration: 1000 }}
      >
        {char}
      </p>
    {/each}
    {#each 'this' as char, i}
      <p
        class="animate-bouncer text-secondary"
        in:fade={{ delay: 1000 + i * 150, duration: 1800 }}
        out:fly={{ y: -20, duration: 1000 }}
      >
        {char}
      </p>
    {/each}
  </div>
  <div
    class="flex h-16 pointer-events-none xl:absolute lg:absolute xl:-mt-14 lg:-mt-14 xl:justify-center lg:justify-center"
  >
    {#if $secretWords.length}
      {#if socketId == drawer.id}
        <p class="text-2xl text-secondary">{$secretWords.at(-1)}</p>
      {:else}
        <p class="text-2xl text-secondary h-1 tracking-wider">
          {$lengthOfSecretWord}
        </p>
      {/if}
    {/if}
  </div>

  <div
    class="xl:absolute lg:absolute xl:top-2 xl:right-2 lg:top-2 lg:right-2 backdrop-blur-sm rounded-full pointer-events-none"
  >
    <ProgressBar />
  </div>
  <div class="flex justify-center">
    <canvas
      class="bg-white border-2 justify-center rounded-md border-solid border-secondary shadow-69xl shadow-secondary cursor-emoji xl:h-xl xl:w-xl md:w-df sm:w-96"
      id="myCanvas"
      on:mousemove={socketId == drawer.id ? handleDraw : null}
      on:mousedown={startPosition}
      on:mouseup={finishedPosition}
      on:mouseleave={finishedPosition}
    />
  </div>
  <div class="flex justify-between gap-4 mt-8 xl:absolute lg:absolute ">
    {#if socketId == drawer.id}
      <button on:click={clear} class="btn btn-success"> Clear </button>
      <div class="btn-group">
        <input
          type="radio"
          name="options"
          bind:group={penColor}
          value={'black'}
          data-title="🖤"
          class="btn btn-outline border-4 border-black hover:bg-gray-700 hover:border-gray-700"
          checked
        />
        <input
          type="radio"
          name="options"
          bind:group={penColor}
          value={'red'}
          data-title="🍓"
          class="btn btn-outline border-4 border-red-600 hover:bg-red-500 hover:border-red-500"
        />
        <input
          type="radio"
          name="options"
          bind:group={penColor}
          value={'blue'}
          data-title="🫐"
          class="btn btn-outline border-4 border-blue-500 hover:bg-blue-400 hover:border-blue-400"
        />
        <input
          type="radio"
          name="options"
          bind:group={penColor}
          value={'green'}
          data-title="🥒"
          class="btn btn-outline border-4 border-green-700 hover:bg-green-400 hover:border-green-400"
        />
        <input
          type="radio"
          name="options"
          bind:group={penColor}
          value={'yellow'}
          data-title="🍋"
          class="btn btn-outline border-4 border-yellow-400 hover:bg-yellow-200 hover:border-yellow-200"
        />
        <input
          type="radio"
          name="options"
          bind:group={penColor}
          value={'orange'}
          data-title="🍊"
          class="btn btn-outline border-4 border-orange-500 hover:bg-orange-500 hover:border-orange-500"
        />
        <input
          type="radio"
          name="options"
          bind:group={penColor}
          value={'brown'}
          data-title="📦"
          class="btn btn-outline border-4 border-amber-700 hover:border-amber-700 hover:bg-amber-700"
        />
        <input
          type="radio"
          name="options"
          bind:group={penColor}
          value={'purple'}
          data-title="♏️"
          class="btn btn-outline border-4 border-purple-400 hover:border-purple-400 hover:bg-purple-400"
        />
        <input
          type="radio"
          name="options"
          bind:group={penColor}
          value={'pink'}
          data-title="🌸"
          class="btn btn-outline border-4 border-pink-300 hover:border-pink-300 hover:bg-pink-300"
        />
        <input
          type="radio"
          name="options"
          bind:group={penColor}
          value={'white'}
          data-title="🧼"
          class="btn btn-outline border-4"
        />
        <input
          type="color"
          name="options"
          bind:value={penColor}
          data-title="🎨"
          class="btn btn-outline border-4"
        />
      </div>
      <input
        type="range"
        min="1"
        max="30"
        bind:value={lineWidth}
        class="range range-xs range-accent w-52 lg:w-40"
      />
    {/if}
  </div>
</div>

<style>
</style>
