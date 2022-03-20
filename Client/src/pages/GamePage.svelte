<script lang="ts">
  import { onMount, setContext } from 'svelte';
  import Canvas from '../components/canvas.svelte';
  import Chat from '../components/Chat.svelte';
  export const location = null;
  export let gameSocket;
  // setContext('socket', {
  //   getSocket: (channelTopic) => socket(channelTopic)
  // });

  
</script>

<div class="container">
  <div class="app">
    <Canvas gameSocket={gameSocket} />
    <Chat />
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
