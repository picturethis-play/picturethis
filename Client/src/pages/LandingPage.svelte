<script lang="ts">
  import Button from '../components/Button.svelte';
  import { fade, fly } from 'svelte/transition';
  import { navigate } from 'svelte-routing';

  $: visible = true;

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
</script>

<!-- h-820px is a hack, set in tailwind.css file -->
<div class="bg-gray-400 h-820px w-full">
  <div class="bg-gray-400 flex items-center justify-center w-full">
    <div class="flex items-center h-40 text-6xl">
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
