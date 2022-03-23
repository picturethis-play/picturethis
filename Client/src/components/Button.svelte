<script>
  export let name;
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  function sayHello() {
    dispatch('message', {
      text: 'Hello!',
    });
  }
</script>

<button
  on:click={sayHello}
  class="h-16 w-36 text-white bg-blue-500 rounded-lg flex justify-center items-center cursor-pointer hover:bg-red-500 active:bg-green-400"
  aria-label="button"
>
  <h3>{name}</h3>
</button>

<style>
  /* button:active {
    background-color: #ff3e00;
  } */
</style>
