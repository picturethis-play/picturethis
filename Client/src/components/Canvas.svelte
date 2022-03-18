<script>
  import { onMount } from 'svelte';
  let penColor;
  let painting;
  let canvas;
  let ctx;
  let lineWidth = 5;

  onMount(() => {
    canvas = document.getElementById('myCanvas');
    ctx = canvas.getContext('2d');

    // this is where the problem is coming from
    canvas.height = 400;
    canvas.width = 300;

    canvas.addEventListener('mousedown', startPosition);
    canvas.addEventListener('mouseup', finishedPosition);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('touchstart', startPosition);
    canvas.addEventListener('touchend', finishedPosition);
    canvas.addEventListener('touchmove', draw);
  });

  function startPosition(e) {
    painting = true;
    draw(e);
  }

  function finishedPosition() {
    painting = false;
    ctx.beginPath();
  }

  function draw(e) {
    if (!painting) return;
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = penColor;
    ctx.lineCap = 'round';

    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX, e.clientY);
  }

  function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
  }
</script>

<canvas class="canvas" id="myCanvas" />
<div class="footer">
  <button on:click={clear}> Clear </button>
  <!-- <input type="color" bind:value={penColor} /> -->
  <!-- <button bind:value=penColor>Blue</button> -->
  <input type="range" min="1" max="10" bind:value={lineWidth} />
</div>

<style>
  .canvas {
    border: 2px solid;
    width: 600px;
    height: 400px;
  }
  .footer {
    display: flex;
    gap: 16px;
    align-items: center;
    height: 50px;
  }
  /* input[type='color'] {
    height: 36px;
  } */
</style>
