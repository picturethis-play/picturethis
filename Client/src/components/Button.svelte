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
  on:click|once={sayHello}
  class="h-12 w-36 text-white bg-blue-500 rounded-lg flex justify-center items-center cursor-pointer hover:bg-red-500 active:bg-green-400 p-4 m-2"
  aria-label="button"
>
  <h3>{name}</h3>
</button>

<style>
</style>
