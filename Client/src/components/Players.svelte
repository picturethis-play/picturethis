<script>
  import { Socket } from 'socket.io-client';

  import { onMount } from 'svelte';
  import { randomUser } from '../stores/chat-stores';
  const drawer = sessionStorage.getItem('drawer');
  import io from 'socket.io-client';
  const socket = io('http://localhost:3000');

  $: playerz = [];
  onMount(() => {
    playerz = JSON.parse(sessionStorage.getItem('players'));
  });
  socket.on('updateStores', () => {
    let playerx = JSON.parse(sessionStorage.getItem('players'));
    playerz = playerx.sort((a, b) => b.points - a.points);
  });
</script>

<div
  class="border-2 rounded-md border-secondary shadow-69xl shadow-secondary overflow-y-auto xl:h-xl-jr lg:h-rr lg:mb-2 sm:h-36 sm:w-96 md:h-48 md:w-df mw-72 w-48 bg-neutral p-3"
>
  {#if playerz.length > 0}
    {#each playerz as user}
      <h2 class="text-primary">{user.points}</h2>
      {#if user.id === JSON.parse(drawer).id}
        <p class="text-2x text-primary">{user.name} ✍️</p>
      {:else}
        <p class="text-2x text-accent">{user.name}</p>
      {/if}
    {/each}
  {/if}
</div>
