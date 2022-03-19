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

<button on:click={sayHello} class="button">
  <h3>{name}</h3>
</button>

<style>
  .button {
    height: 70px;
    width: 150px;
    color: white;
    background-color: blue;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .button:active {
    background-color: #ff3e00;
  }
</style>
