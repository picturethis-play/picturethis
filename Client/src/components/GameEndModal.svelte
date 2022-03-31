<script>
  import { navigate } from 'svelte-routing';
  function navigation() {
    navigate(`/`, { replace: true });
  }

  import io from 'socket.io-client';
  const socket = io('http://localhost:3000');
  // $: players = [];

  $: players = JSON.parse(sessionStorage.getItem('players'));
</script>

<input type="checkbox" id="my-modal-5" class="modal-toggle" checked />
<div class="modal">
  <div class="modal-box w-11/12 max-w-5xl">
    {#if players}
      {#each players as player}
        <p>{player.name} {player.points}</p>
      {/each}
    {/if}
    <h3 class="font-bold text-lg">Congratulations random Interner user!</h3>
    <p class="py-4">
      You've been selected for a chance to get one year of subscription to use Wikipedia for free!
    </p>
    <div class="modal-action">
      <label for="my-modal-5" class="btn" on:click={navigation}>Start another game :-</label>
    </div>
  </div>
</div>
