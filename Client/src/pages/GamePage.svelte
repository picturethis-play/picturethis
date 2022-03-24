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


  
  
  function joinGame() {
    //validate name
    if (name.length === 0) {
      alert('please name yourself');
      return;
    }
    gameSocket.push('join-game', { name });
  
  }
</script>


<div class="h-820px w-full flex items-center justify-center bg-gray-400 pt-52">
  <div class="flex justify-center gap-5 items-start h-1000px">

    <div class="name-input">
      <input type="text" placeholder="" bind:value={name} />
      <Button on:message={joinGame} name="Enter Name" />
    </div>
    <Canvas {gameSocket} />
    <Chat {gameSocket} />
  </div>
</div>


