<script>
  import { onMount } from 'svelte';
  const drawer = sessionStorage.getItem('drawer');
  import io from 'socket.io-client';
  const socket = io('http://localhost:3000');
  import { fade, fly } from 'svelte/transition';

  onMount(() => {
    playerz = JSON.parse(sessionStorage.getItem('players'));
  });

  const resetPoints = () => {
    setTimeout(() => {
      newPoints = 0;
    }, 2500);
  };

  $: playerz = [];
  $: newPoints = 0;
  $: pointsAddedTo = [];
  socket.on('addPoints', ({ pointsAdded, data }) => {
    let playerx = JSON.parse(sessionStorage.getItem('players'));
    playerz = playerx.sort((a, b) => b.points - a.points);
    newPoints = pointsAdded;
    pointsAddedTo = data;
    resetPoints();
  });
</script>

 <div
    class="border-2 rounded-md border-secondary shadow-69xl shadow-secondary overflow-y-auto w-box xl:h-xl lg:h-rr lg:mb-2 sm:h-36 sm:w-96 md:h-48 md:w-df bg-neutral p-3"
  >
  {#if playerz.length > 0}
    {#each playerz as user}
      <h2 class="text-primary">
        {user.points}
        {#if pointsAddedTo === user.id}
          {#if newPoints !== 0}
            <span class="text-green-600" transition:fade={{ duration: 1000 }}>+{newPoints}</span>
          {/if}

        {/if}
      </h2>
      {#if user.id === JSON.parse(drawer).id}
        <p class="text-2x text-primary">{user.name} ✍️</p>
      {:else}
        <p class="text-2x text-accent">{user.name}</p>
      {/if}
    {/each}
  {/if}
</div>
