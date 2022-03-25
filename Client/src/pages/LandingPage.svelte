<script lang="ts">
  import { fade, fly } from 'svelte/transition';
</script>

<div class="flex-col items-center justify-center">
  <div class=" flex items-center justify-center">
    <div class="flex items-center font-logo text-69xl">
      {#each 'picture' as char, i}
        <p in:fade={{ delay: 1000 + i * 150, duration: 1500 }} out:fly={{ y: -20, duration: 1000 }}>
          {char}
        </p>
      {/each}
    </div>
    <div class="flex items-center font-logo text-69xl">
      {#each 'this' as char, i}
        <p in:fade={{ delay: 2000 + i * 150, duration: 1800 }} out:fly={{ y: -20, duration: 1000 }}>
          {char}
        </p>
      {/each}
    </div>
  </div>
  <div class="flex items-center justify-center font-logo text-10xl gap-8 ">
    <button class="border-none">Create Game</button>
    <button class="border-none">Join Game</button>
  </div>
</div>
