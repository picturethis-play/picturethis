<script>
  import { onMount } from 'svelte';

  import { players, randomUser } from '../stores/chat-stores';
  console.log($randomUser);

  $: playerz = [];
  onMount(() => {
    playerz = JSON.parse(sessionStorage.getItem('players'));
    console.log(typeof playerz);
  });
</script>

<div class="border-2 rounded-md border-black h-96 w-72 bg-white p-3">
  {#if playerz.length > 0}
    {#each playerz as user}
      {#if user.name === $randomUser.name}
        <p class="text-2xl {$randomUser} text-blue-400">{user.name} ✍️</p>
      {:else}
        <p class="text-2xl">{user.name}</p>
      {/if}
    {/each}
  {/if}
</div>
