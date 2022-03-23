<script lang="ts">
  import Button from '../components/Button.svelte';
  import { fade, fly } from 'svelte/transition';
  import { navigate } from 'svelte-routing';
  // export let gameSocket;

  $: visible = true;

  // gameSocket.on('game-created', ({ gameId }) => {
  //   navigate(`/game/${gameId}`, { replace: true });
  // });
  async function startGame() {
    await fetch('http://localhost:4000/create-game', {
      method: 'GET',
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    })
      .then((response) => response.json())
      .then((data) => navigate(`/game/${data.gameId}`, { replace: true }));
  }

  function visibility() {
    visible = !visible;
    console.log('hi');
  }
</script>

<!-- <label>
  <input type="checkbox" bind:checked={visible} />
</label> -->

<div class="container">
  <div class="logo">
    <!-- <Header /> -->
    <div class="centered">
      {#if visible}
        {#each 'picturethis' as char, i}
          <h1
            in:fade={{ delay: 1000 + i * 150, duration: 1500 }}
            out:fly={{ y: -20, duration: 1000 }}
          >
            {char}
          </h1>
        {/each}
      {/if}
    </div>
  </div>
  <div class="buttons">
    <Button on:message={startGame} name="Create Room" />
    <Button name="Join Room" />
  </div>
</div>

<style>
  .container {
    background-color: #bdc3d5;
    height: 820px;
    width: 100%;
  }
  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #bdc3d5;
    /* color: white; */
    width: 100%;
  }
  /* .name-input {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 50px;
  } */
  .buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 50px;
    border-top: 150px;
  }
  .centered {
    display: flex;
    font-size: 32px;
    height: 150px;
  }
</style>
