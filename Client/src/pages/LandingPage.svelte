<script lang="ts">
  import Button from '../components/Button.svelte';
  import { fade, fly } from 'svelte/transition';
  import { navigate } from 'svelte-routing';

  import { playerName } from '../stores/chat-stores';
  export let gameSocket;
  let name = '';

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

<!-- h-820px is a hack, set in tailwind.css file -->
<div class="bg-gray-400 h-820px w-full">

  <div class="bg-gray-400 flex items-center justify-center w-full">

    <div class="flex  items-center h-40 text-6xl">
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
  <div class="flex items-center justify-center gap-8">
    <Button on:message={startGame} name="Create Room" />
    <Button name="Join Room" />
  </div>
</div>

