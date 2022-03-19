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
    console.log('ctx', ctx);
    // this is where the problem is coming from
    canvas.height = 700;
    canvas.width = 1000;
    // canvas.height = '700px';
    // canvas.width = '1000px';

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

  function getMouesPosition(e) {
    var mouseX = ((e.offsetX * canvas.width) / canvas.clientWidth) | 0;
    var mouseY = ((e.offsetY * canvas.height) / canvas.clientHeight) | 0;
    return { x: mouseX, y: mouseY };
  }

  function draw(e) {
    if (!painting) return;
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = penColor;
    ctx.lineCap = 'round';
    console.log(e.x);
    console.log(e.y);
    ctx.lineTo(getMouesPosition(e).x, getMouesPosition(e).y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(getMouesPosition(e).x, getMouesPosition(e).y);
  }

  function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.height = 1000;
    canvas.width = 700;
  }

  let m = { x: 0, y: 0 };

  function handleMousemove(event) {
    m.x = event.clientX;
    m.y = event.clientY;
  }
</script>

<!-- <div class="container" > -->
<p>The mouse position is {m.x} x {m.y}</p>
<canvas class="canvas" id="myCanvas" on:mousemove={handleMousemove} />

<div class="footer">
  <button on:click={clear}> Clear </button>
  <input type="color" bind:value={penColor} />
  <!-- <button bind:value=penColor>Blue</button> -->
  <input type="range" min="1" max="10" bind:value={lineWidth} />
</div>

<!-- </div> -->
<style>
  .canvas {
    border: 2px solid;
    width: 1000px;
    height: 700px;
    display: block;
    cursor: crosshair;
  }
  .footer {
    display: flex;
    gap: 16px;
    align-items: center;
    height: 50px;
  }
  /* .container {
    height: 100%;
    width: 100%;
  } */
  input[type='color'] {
    height: 36px;
  }
</style>
