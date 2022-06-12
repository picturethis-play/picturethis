<script lang="ts">
  import { navigate } from 'svelte-routing';
  import { fade, fly } from 'svelte/transition';
  import { onMount, getContext } from 'svelte';
  import { game } from '../stores/chat-stores'
  import { themeChange } from 'theme-change';
  let penColor;
  let canvas;
  let ctx;
  let stroke;
  let lineWidth = 2;
  const { Socket } = getContext('connect');
  const socket = Socket();
  let room = '';

  function enterIfYouDare() {
    if (room === '') return;
    sessionStorage.setItem('socketid', socket.id);
    socket.emit('room', room);
    game.set(room);
    return navigate(`/waitingRoom`, { replace: true });
  }
  onMount(() => {
     themeChange(false);
    // 👆 false parameter is required for svelte
    canvas = document.getElementById('theCanvas');
    ctx = canvas.getContext('2d');
    canvas.height = 500;
    canvas.width = 800;
  });

  function getMousePosition(e) {
    var mouseX = ((e.offsetX * canvas.width) / canvas.clientWidth) | 0;
    var mouseY = ((e.offsetY * canvas.height) / canvas.clientHeight) | 0;
    return { x: mouseX, y: mouseY };
  }
  function randomColor() {
    const colors = ['blue', 'yellow', 'red', 'purple', 'orange', 'pink', 'green'];
    const random = Math.floor(Math.random() * colors.length);
    stroke = colors[random];
  }
  function handleDraw(e) {
    const mousePosition = getMousePosition(e);
    draw(mousePosition, lineWidth, penColor);
  }
  function draw(mousePosition, lineWidth, penColor) {
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = penColor;
    ctx.lineCap = 'round';
    ctx.strokeStyle = `${stroke}`;
    ctx.lineTo(mousePosition.x, mousePosition.y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(mousePosition.x, mousePosition.y);
  }
</script>

<div id="container" class="cursor-pointer overflow-hidden">
  <div id="overlay">
    <div class=" flex items-center justify-center">
      <canvas class="" id="theCanvas" on:mousemove={handleDraw} on:mousedown={randomColor}  on:touchmove={handleDraw} on:touchstart={randomColor}/>
      <div class="flex items-center font-logo text-69xl sm:text-5xl md:text-10xl text-accent">
        {#each 'picture' as char, i}
          <p
            class="animate-bouncer hover:animate-ping"
            in:fade={{ delay: 1000 + i * 150, duration: 1500 }}
            out:fly={{ y: -20, duration: 1000 }}
          >
            {char}
          </p>
        {/each}
      </div>
      <div class="flex items-center font-logo text-69xl sm:text-5xl md:text-10xl text-secondary">
        {#each 'this' as char, i}
          <p
            class="animate-bouncey hover:animate-ping"
            in:fade={{ delay: 2000 + i * 150, duration: 1800 }}
            out:fly={{ y: -20, duration: 2000 }}
          >
            {char}
          </p>
        {/each}
      </div>
    </div>
    <div class="flex flex-col items-center justify-center font-logo gap-8" id="start">
      <input
        class="input input-ghost input-lg text-2xl "
        type="text"
        name=""
        id=""
        bind:value={room}
        placeholder="enter room name here..."
      />
      <button class="btn btn-outline text-2xl" on:click={enterIfYouDare}>Join or create game</button
      >
      <input
      type="checkbox"
      class="toggle mt-1"
      data-toggle-theme="emerald,dracula"
      data-act-class="ACTIVECLASS"
    />🌚/🌞
    </div>
  </div>
</div>
