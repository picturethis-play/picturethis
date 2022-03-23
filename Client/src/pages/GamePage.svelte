<script lang="ts">
  import Canvas from '../components/canvas.svelte';
  import Chat from '../components/Chat.svelte';
  import Button from '../components/Button.svelte';
  export const location = null;
  import socket from '../socket';
  export let gameId;
  let name = '';

  const gameSocket = socket('game:' + gameId);
  console.log(gameSocket);

  function createGame() {
    //validate name
    if (name.length === 0) {
      alert('please name yourself');
      return;
    }
    gameSocket.push('create-game', { name });
  }
</script>

<div class="container">
  <div class="app">
    <div class="name-input">
      <input type="text" placeholder="" bind:value={name} />
      <Button on:message={createGame} name="Enter Name" />
    </div>
    <Canvas {gameSocket} />
    <Chat {gameSocket} />
  </div>
</div>

<style>
  .container {
    padding-top: 200px;
    height: 820px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #bdc3d5;
  }
  .app {
    display: flex;
    justify-content: center;
    gap: 20px;
    align-items: flex-start;
    height: 1000px;
  }
</style>
