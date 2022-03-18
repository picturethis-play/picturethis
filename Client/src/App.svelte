<script lang="ts">
  const canvas = document.createElement('canvas');

  document.body.appendChild(canvas);

  document.body.style.margin = '0';

  canvas.style.position = 'fixed';
  var ctx = canvas.getContext('2d');
  resize();
  var pos = { x: 0, y: 0 };

  window.addEventListener('resize', resize);
  document.addEventListener('mousemove', draw);
  document.addEventListener('mousedown', setPosition);
  document.addEventListener('mouseenter', setPosition);

  function setPosition(e) {
    pos.x = e.clientX - 10;
    pos.y = e.clientY - 10;
  }

  function resize() {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
  }

  function draw(e) {
    if (e.buttons !== 1) return;

    ctx.beginPath();

    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'black';

    ctx.moveTo(pos.x, pos.y);
    setPosition(e);
    ctx.lineTo(pos.x, pos.y);

    ctx.stroke();
  }
</script>

<style>
</style>
