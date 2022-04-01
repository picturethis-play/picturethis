<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { onMount } from 'svelte';
  let penColor; 
  let canvas;
  let ctx;
  let stroke;
  let lineWidth = 20;
  onMount(() => {
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

<div id="container">
  <div id="overlay">
    <div class=" flex items-center justify-center">
      <canvas class="" id="theCanvas" on:mousemove={handleDraw} on:mousedown={randomColor} />
      <div class="flex items-center font-logo text-69xl text-accent">
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
      <div class="flex items-center font-logo text-69xl text-secondary">
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
    <!-- <div class="flex items-center justify-center font-logo text-10xl gap-8" id="start">
      <button class="border-none">Create Game</button>
      <button class="border-none">Join Game</button>
    </div> -->
  </div>
</div>
