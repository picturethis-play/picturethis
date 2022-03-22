<script lang="ts">
  import App from '../App.svelte';
  import Canvas from '../components/canvas.svelte';
  import Chat from '../components/Chat.svelte';
  import ChatDivided from '../components/ChatDivided.svelte';
  export const location = null;
  export let gameSocket;
  export let id;
  console.log(id);

  const canvasProps = {
    gameSocket: gameSocket,
  };

</script>

<div class="container">
  <div class="app">
    <Canvas {...canvasProps} />
    <Chat {...canvasProps} />
    <ChatDivided {...canvasProps}/>
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
