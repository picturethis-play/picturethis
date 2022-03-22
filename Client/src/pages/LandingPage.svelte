<script>
  import Button from '../components/Button.svelte';
  import { fade, fly } from 'svelte/transition';
  import { navigate } from 'svelte-routing';
  import { playerName } from '../stores/chat-stores';
  export let gameSocket;
  let name = '';
  $: visible = true;

  gameSocket.on('game-created', ({ gameId }) => {
    navigate(`/game/${gameId}`, { replace: true });
  });

  function visibility() {
    visible = !visible;
    console.log('hi');
  }

  function createGame() {
    //validate name
    if (name.length === 0) {
      alert('please name yourself');
      return;
    }
    playerName.set(name)
    gameSocket.push('create-game', { name });
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

  <div class="name-input">
    <input type="text" placeholder="enter name" bind:value={name} />
  </div>

  <div class="buttons">
    <Button on:message={createGame} name="Create Room" />
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
  .name-input {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 50px;
  }
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
