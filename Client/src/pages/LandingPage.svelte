<script lang="ts">
  import Button from '../components/Button.svelte';
  import { fade, fly } from 'svelte/transition';
  import { navigate } from 'svelte-routing';

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
<div class="flex-col items-center w-full">
  <div class="flex items-center justify-around w-full mt-72">
      <div class="flex justify-around box-border h-40">
        <div class="flex items-center animate-bouncer text-69xl font-logo h-40 border-2 border-black rounded-md py-40 bg-white">
          {#each 'picture' as char, i}
            <p
              in:fade={{ delay: 1000 + i * 150, duration: 1500 }}
              out:fly={{ y: -20, duration: 1000 }}
            >
              {char}
            </p>
          {/each}
        </div>
        <div class="flex items-center animate-bouncey text-69xl font-logo h-40 border-2 border-black rounded-md py-40 bg-white">
        {#each 'this' as char, i}
          <p
            in:fade={{ delay: 2000 + i * 150, duration: 1500 }}
            out:fly={{ y: -20, duration: 1000 }}
          >
            {char}
          </p>
        {/each}
      </div>
    </div>
  </div>
  <div class="flex items-center justify-center gap-8 mt-48">
    <Button on:message={startGame} name="Create Room"/>
    <Button name="Join Room" />
  </div>
</div>
