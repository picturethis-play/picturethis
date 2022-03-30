<script>
  import io from 'socket.io-client';
  const socket = io('http://localhost:3000');
  import wordDb from '../assets/db';
  const randomWords = wordDb;

  const drawer = sessionStorage.getItem('drawer');
  const socketId = sessionStorage.getItem('socketid');

  function startGame() {
    socket.emit('start', randomWords[Math.floor(Math.random() * randomWords.length)].word);
    socket.emit('drawer');
  }
</script>

<input type="checkbox" id="my-modal" class="modal-toggle" checked />
<div class="modal">
  <div class="modal-box">
    <h3 class="font-bold text-lg text-error">Game RULES:</h3>
    <p class="py-4 text-error">
      {JSON.parse(drawer).name}: drawer
    </p>
    {#if socketId === JSON.parse(drawer).id}
      <div class="modal-action">
        <label for="my-modal" class="btn btn-accent" on:click={startGame}>Lets goooo!</label>
      </div>
    {/if}
  </div>
</div>
