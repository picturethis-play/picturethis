<script>
  import { writable } from 'svelte/store';

  const time = 1;
  const progress = writable(time);
  const coundown = () => {
    if (time == 0) return;
    setInterval(() => (time = time - 0.1), 1000);
  };
  $: progress.set(time);
</script>

<progress value={$progress} />

<!-- <button on:click={() => progress.set(0)}> 0% </button>

<button on:click={() => progress.set(0.25)}> 25% </button>

<button on:click={() => progress.set(0.5)}> 50% </button> -->

<!-- <button on:click={() => progress.set(0.75)}> 75% </button> -->

<!-- <button on:click={() => progress.set(1)}> 100% </button> -->
<button on:click={() => coundown()}> 100% </button>

<style>
  progress {
    display: block;
    width: 100%;
  }
</style>
