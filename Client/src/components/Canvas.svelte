<script>
  export let gameSocket;
  import { onMount } from 'svelte';
  let penColor;
  let painting;
  let canvas;
  let ctx;
  let lineWidth = 5;
  gameSocket.on('draw-replay', ({ mousePosition, lineWidth, penColor }) => {
    draw(mousePosition, lineWidth, penColor, false);
  });

  gameSocket.on('cleargame', (e) => {
    clear();
  });

  onMount(() => {
    canvas = document.getElementById('myCanvas');
    ctx = canvas.getContext('2d');
    canvas.height = 500;
    canvas.width = 500;

    canvas.addEventListener('mousedown', startPosition);
    canvas.addEventListener('mouseup', finishedPosition);
    canvas.addEventListener('mousemove', handleDraw);
    canvas.addEventListener('touchstart', startPosition);
    canvas.addEventListener('touchend', finishedPosition);
    canvas.addEventListener('touchmove', handleDraw);
  });

  function startPosition(e) {
    painting = true;
    console.log('startposition');
  }

  function finishedPosition() {
    painting = false;
    ctx.beginPath();
    console.log('finishedposition');
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
    if (broadcast) gameSocket.push('draw', { mousePosition, lineWidth, penColor });
  }

  function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.height = 500;
    canvas.width = 500;
    gameSocket.push('clear');
  }

  let m = { x: 0, y: 0 };

  function handleMousemove(event) {
    m.x = event.clientX;
    m.y = event.clientY;
  }
</script>

<div>
  <canvas class="canvas" id="myCanvas" on:mousemove={handleMousemove} />

  <div class="footer">
    <button on:click={clear}> Clear </button>
    <input type="color" bind:value={penColor} />
    <input type="range" min="1" max="10" bind:value={lineWidth} />
  </div>
</div>

<style>
  .canvas {
    border: 2px solid;
    width: 500px;
    height: 500px;
    display: block;
    cursor: crosshair;
    background-color: white;
  }
  .footer {
    display: flex;
    gap: 16px;
    align-items: center;
    height: 50px;
  }
  input[type='color'] {
    height: 36px;
  }
</style>
